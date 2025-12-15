import { api } from "encore.dev/api";
import db from "../db";

export interface ListLeadsRequest {
  contractorId: number;
  status?: string;
}

export interface Lead {
  id: number;
  estimateId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  tradeName: string;
  totalCost: number;
  status: string;
  followUpDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListLeadsResponse {
  leads: Lead[];
}

// Retrieves all leads for a contractor.
export const list = api<ListLeadsRequest, ListLeadsResponse>(
  { expose: true, method: "GET", path: "/leads/contractor/:contractorId" },
  async (req) => {
    const leads: Lead[] = [];
    
    const query = req.status
      ? db.query<Lead>`
          SELECT 
            l.id, l.estimate_id as "estimateId", e.customer_name as "customerName",
            e.customer_email as "customerEmail", e.customer_phone as "customerPhone",
            t.name as "tradeName", e.total_cost as "totalCost", l.status,
            l.follow_up_date as "followUpDate", l.notes, l.created_at as "createdAt",
            l.updated_at as "updatedAt"
          FROM leads l
          JOIN estimates e ON l.estimate_id = e.id
          JOIN trades t ON e.trade_id = t.id
          WHERE l.contractor_id = ${req.contractorId} AND l.status = ${req.status}
          ORDER BY l.created_at DESC
        `
      : db.query<Lead>`
          SELECT 
            l.id, l.estimate_id as "estimateId", e.customer_name as "customerName",
            e.customer_email as "customerEmail", e.customer_phone as "customerPhone",
            t.name as "tradeName", e.total_cost as "totalCost", l.status,
            l.follow_up_date as "followUpDate", l.notes, l.created_at as "createdAt",
            l.updated_at as "updatedAt"
          FROM leads l
          JOIN estimates e ON l.estimate_id = e.id
          JOIN trades t ON e.trade_id = t.id
          WHERE l.contractor_id = ${req.contractorId}
          ORDER BY l.created_at DESC
        `;
    
    for await (const row of query) {
      leads.push(row);
    }
    
    return { leads };
  }
);
