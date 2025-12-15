import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Estimate, EstimateItem } from "./create";

export interface GetEstimateRequest {
  id: number;
}

// Retrieves estimate details.
export const get = api<GetEstimateRequest, Estimate>(
  { expose: true, method: "GET", path: "/estimates/:id" },
  async (req) => {
    const estimate = await db.queryRow<Omit<Estimate, "items">>`
      SELECT 
        id, contractor_id as "contractorId", trade_id as "tradeId",
        customer_name as "customerName", customer_email as "customerEmail",
        customer_phone as "customerPhone", customer_address as "customerAddress",
        zip_code as "zipCode", project_details as "projectDetails",
        subtotal, tax_amount as "taxAmount", total_cost as "totalCost",
        status, created_at as "createdAt"
      FROM estimates
      WHERE id = ${req.id}
    `;
    
    if (!estimate) {
      throw APIError.notFound("estimate not found");
    }
    
    const items: EstimateItem[] = [];
    const itemRows = db.query<EstimateItem>`
      SELECT 
        item_code as "itemCode", item_name as "itemName",
        quantity, unit, labor_cost as "laborCost",
        material_cost as "materialCost", total_cost as "totalCost"
      FROM estimate_items
      WHERE estimate_id = ${req.id}
    `;
    
    for await (const row of itemRows) {
      items.push(row);
    }
    
    return {
      ...estimate,
      items,
    };
  }
);
