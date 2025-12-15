import { api } from "encore.dev/api";
import db from "../db";

export interface UpdateCustomPricingRequest {
  contractorId: number;
  itemCode: string;
  customLaborRate?: number;
  customMaterialCost?: number;
}

// Updates contractor's custom pricing for an item.
export const updateCustomPricing = api<UpdateCustomPricingRequest, void>(
  { expose: true, method: "POST", path: "/pricing/custom" },
  async (req) => {
    await db.exec`
      INSERT INTO contractor_price_overrides 
        (contractor_id, item_code, custom_labor_rate, custom_material_cost)
      VALUES (${req.contractorId}, ${req.itemCode}, ${req.customLaborRate || null}, ${req.customMaterialCost || null})
      ON CONFLICT (contractor_id, item_code) 
      DO UPDATE SET 
        custom_labor_rate = ${req.customLaborRate || null},
        custom_material_cost = ${req.customMaterialCost || null}
    `;
  }
);
