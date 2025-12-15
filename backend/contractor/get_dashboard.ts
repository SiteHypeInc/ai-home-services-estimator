import { api } from "encore.dev/api";
import db from "../db";

export interface GetDashboardRequest {
  contractorId: number;
}

export interface DashboardStats {
  totalEstimates: number;
  pendingLeads: number;
  totalRevenue: number;
  conversionRate: number;
  recentEstimates: RecentEstimate[];
}

interface RecentEstimate {
  id: number;
  customerName: string;
  tradeName: string;
  totalCost: number;
  status: string;
  createdAt: Date;
}

// Retrieves contractor dashboard statistics.
export const getDashboard = api<GetDashboardRequest, DashboardStats>(
  { expose: true, method: "GET", path: "/contractors/:contractorId/dashboard" },
  async (req) => {
    const totalEstimates = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM estimates WHERE contractor_id = ${req.contractorId}
    `;
    
    const pendingLeads = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM leads 
      WHERE contractor_id = ${req.contractorId} AND status = 'new'
    `;
    
    const revenue = await db.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(total_cost), 0) as total FROM estimates 
      WHERE contractor_id = ${req.contractorId} AND status = 'accepted'
    `;
    
    const wonLeads = await db.queryRow<{ count: number }>`
      SELECT COUNT(*)::int as count FROM leads 
      WHERE contractor_id = ${req.contractorId} AND status = 'won'
    `;
    
    const recentEstimates: RecentEstimate[] = [];
    const rows = db.query<RecentEstimate>`
      SELECT 
        e.id, 
        e.customer_name as "customerName", 
        t.name as "tradeName",
        e.total_cost as "totalCost", 
        e.status, 
        e.created_at as "createdAt"
      FROM estimates e
      JOIN trades t ON e.trade_id = t.id
      WHERE e.contractor_id = ${req.contractorId}
      ORDER BY e.created_at DESC
      LIMIT 10
    `;
    
    for await (const row of rows) {
      recentEstimates.push(row);
    }
    
    const total = totalEstimates?.count || 0;
    const won = wonLeads?.count || 0;
    
    return {
      totalEstimates: total,
      pendingLeads: pendingLeads?.count || 0,
      totalRevenue: revenue?.total || 0,
      conversionRate: total > 0 ? (won / total) * 100 : 0,
      recentEstimates,
    };
  }
);
