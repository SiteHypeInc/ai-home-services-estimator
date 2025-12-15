import { api } from "encore.dev/api";
import db from "../db";

export interface GetBasePricesRequest {
  tradeId: number;
}

export interface BasePrice {
  id: number;
  itemCode: string;
  itemName: string;
  baseLaborRate: number;
  baseMaterialCost: number;
  unit: string;
}

export interface GetBasePricesResponse {
  prices: BasePrice[];
}

// Retrieves base prices for a trade.
export const getBasePrices = api<GetBasePricesRequest, GetBasePricesResponse>(
  { expose: true, method: "GET", path: "/pricing/base/:tradeId" },
  async (req) => {
    const prices: BasePrice[] = [];
    const rows = db.query<BasePrice>`
      SELECT 
        id,
        item_code as "itemCode",
        item_name as "itemName",
        base_labor_rate as "baseLaborRate",
        base_material_cost as "baseMaterialCost",
        unit
      FROM base_prices
      WHERE trade_id = ${req.tradeId}
      ORDER BY item_name
    `;
    
    for await (const row of rows) {
      prices.push(row);
    }
    
    return { prices };
  }
);
