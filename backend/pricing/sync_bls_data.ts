import { api } from "encore.dev/api";
import db from "../db";

export interface SyncBLSDataRequest {
  year?: number;
}

export interface SyncBLSDataResponse {
  recordsUpdated: number;
  success: boolean;
}

interface BLSWageData {
  series_id: string;
  year: string;
  period: string;
  value: string;
  area_code?: string;
  occupation_code?: string;
}

const OCCUPATION_MAPPING: Record<string, string> = {
  "47-2152": "plumbing",
  "47-2111": "electrical",
  "49-9021": "hvac",
  "47-2181": "roofing",
  "47-2042": "flooring",
  "47-2141": "painting",
  "37-3011": "landscaping",
};

export const syncBLSData = api(
  { method: "POST", path: "/pricing/sync-bls-data", expose: true },
  async (req: SyncBLSDataRequest): Promise<SyncBLSDataResponse> => {
    const year = req.year || new Date().getFullYear();
    
    const blsApiUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/`;
    
    const seriesIds = Object.keys(OCCUPATION_MAPPING).map(code => `OEUS000000000000${code}03`);
    
    let recordsUpdated = 0;
    
    for (const seriesId of seriesIds) {
      try {
        const response = await fetch(blsApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seriesid: [seriesId],
            startyear: year.toString(),
            endyear: year.toString(),
          }),
        });
        
        if (!response.ok) {
          console.error(`Failed to fetch BLS data for ${seriesId}`);
          continue;
        }
        
        const data = await response.json() as any;
        
        if (data.status !== "REQUEST_SUCCEEDED" || !data.Results?.series?.[0]?.data) {
          console.error(`No data available for ${seriesId}`);
          continue;
        }
        
        const series = data.Results.series[0];
        const latestData = series.data[0];
        
        if (!latestData || !latestData.value) {
          continue;
        }
        
        const hourlyWage = parseFloat(latestData.value);
        
        const occupationCode = seriesId.match(/(\d{2}-\d{4})/)?.[1];
        if (!occupationCode) continue;
        
        const tradeName = OCCUPATION_MAPPING[occupationCode];
        if (!tradeName) continue;
        
        const trade = await db.queryRow<{ id: number }>`
          SELECT id FROM trades WHERE name = ${tradeName}
        `;
        
        if (!trade) continue;
        
        await db.exec`
          UPDATE base_prices
          SET base_labor_rate = ${hourlyWage}
          WHERE trade_id = ${trade.id}
        `;
        
        recordsUpdated++;
      } catch (err) {
        console.error(`Error processing ${seriesId}:`, err);
        continue;
      }
    }
    
    return {
      recordsUpdated,
      success: true,
    };
  }
);
