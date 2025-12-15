import { api } from "encore.dev/api";
import db from "../db";

export interface GetRegionalMultiplierRequest {
  zipCode: string;
}

export interface RegionalMultiplier {
  zipCode: string;
  state: string;
  city?: string;
  laborMultiplier: number;
  materialMultiplier: number;
}

// Retrieves regional pricing multiplier for a zip code.
export const getRegionalMultiplier = api<GetRegionalMultiplierRequest, RegionalMultiplier>(
  { expose: true, method: "GET", path: "/pricing/regional/:zipCode" },
  async (req) => {
    const row = await db.queryRow<RegionalMultiplier>`
      SELECT 
        zip_code as "zipCode",
        state,
        city,
        labor_multiplier as "laborMultiplier",
        material_multiplier as "materialMultiplier"
      FROM pricing_regions
      WHERE zip_code = ${req.zipCode}
    `;
    
    // Default multipliers if zip code not found
    return row || {
      zipCode: req.zipCode,
      state: "Unknown",
      laborMultiplier: 1.0,
      materialMultiplier: 1.0,
    };
  }
);
