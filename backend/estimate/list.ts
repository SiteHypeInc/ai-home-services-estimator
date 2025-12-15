import { api } from "encore.dev/api";
import db from "../db";

export interface ListEstimatesRequest {
  contractorId: number;
}

export interface EstimateSummary {
  id: number;
  tradeName: string;
  customerName: string;
  customerEmail: string;
  zipCode: string;
  totalCost: number;
  status: string;
  createdAt: Date;
}

export interface ListEstimatesResponse {
  estimates: EstimateSummary[];
}

// Retrieves all estimates for a contractor.
export const list = api<ListEstimatesRequest, ListEstimatesResponse>(
  { expose: true, method: "GET", path: "/estimates/contractor/:contractorId" },
  async (req) => {
    const estimates: EstimateSummary[] = [];
    const rows = db.query<EstimateSummary>`
      SELECT 
        e.id, t.name as "tradeName", e.customer_name as "customerName",
        e.customer_email as "customerEmail", e.zip_code as "zipCode",
        e.total_cost as "totalCost", e.status, e.created_at as "createdAt"
      FROM estimates e
      JOIN trades t ON e.trade_id = t.id
      WHERE e.contractor_id = ${req.contractorId}
      ORDER BY e.created_at DESC
    `;
    
    for await (const row of rows) {
      estimates.push(row);
    }
    
    return { estimates };
  }
);
