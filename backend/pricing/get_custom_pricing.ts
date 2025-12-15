import { api } from "encore.dev/api";
import db from "../db";

export interface GetCustomPricingRequest {
  contractorId: number;
}

export interface CustomPrice {
  itemCode: string;
  customLaborRate?: number;
  customMaterialCost?: number;
}

export interface GetCustomPricingResponse {
  customPrices: CustomPrice[];
}

// Retrieves contractor's custom pricing overrides.
export const getCustomPricing = api<GetCustomPricingRequest, GetCustomPricingResponse>(
  { expose: true, method: "GET", path: "/pricing/custom/:contractorId" },
  async (req) => {
    const customPrices: CustomPrice[] = [];
    const rows = db.query<CustomPrice>`
      SELECT 
        item_code as "itemCode",
        custom_labor_rate as "customLaborRate",
        custom_material_cost as "customMaterialCost"
      FROM contractor_price_overrides
      WHERE contractor_id = ${req.contractorId}
    `;
    
    for await (const row of rows) {
      customPrices.push(row);
    }
    
    return { customPrices };
  }
);
