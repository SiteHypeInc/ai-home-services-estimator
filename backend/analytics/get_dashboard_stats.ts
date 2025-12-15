import { api } from "encore.dev/api";
import db from "../db";

export interface GetDashboardStatsRequest {
  contractorId: number;
  startDate?: Date;
  endDate?: Date;
}

export interface DashboardStats {
  totalEstimates: number;
  totalRevenue: number;
  averageEstimateValue: number;
  conversionRate: number;
  estimatesByTrade: Array<{
    tradeName: string;
    count: number;
    totalValue: number;
  }>;
  leadsByStatus: Array<{
    status: string;
    count: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    estimateCount: number;
  }>;
  topZipCodes: Array<{
    zipCode: string;
    count: number;
    totalValue: number;
  }>;
}

export const getDashboardStats = api(
  { method: "GET", path: "/analytics/dashboard/:contractorId", expose: true },
  async (req: GetDashboardStatsRequest): Promise<DashboardStats> => {
    const startDate = req.startDate || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const endDate = req.endDate || new Date();

    const totalStats = await db.queryRow<{
      totalEstimates: number;
      totalRevenue: number;
      avgEstimateValue: number;
    }>`
      SELECT 
        COUNT(*)::int as "totalEstimates",
        COALESCE(SUM(total_cost), 0) as "totalRevenue",
        COALESCE(AVG(total_cost), 0) as "avgEstimateValue"
      FROM estimates
      WHERE contractor_id = ${req.contractorId}
        AND created_at >= ${startDate}
        AND created_at <= ${endDate}
    `;

    const conversionStats = await db.queryRow<{
      totalLeads: number;
      wonLeads: number;
    }>`
      SELECT 
        COUNT(*)::int as "totalLeads",
        COUNT(CASE WHEN status = 'won' THEN 1 END)::int as "wonLeads"
      FROM leads
      WHERE contractor_id = ${req.contractorId}
        AND created_at >= ${startDate}
        AND created_at <= ${endDate}
    `;

    const conversionRate = conversionStats && conversionStats.totalLeads > 0
      ? (conversionStats.wonLeads / conversionStats.totalLeads) * 100
      : 0;

    const estimatesByTradeGen = db.query<{
      tradeName: string;
      count: number;
      totalValue: number;
    }>`
      SELECT 
        t.name as "tradeName",
        COUNT(e.id)::int as count,
        COALESCE(SUM(e.total_cost), 0) as "totalValue"
      FROM estimates e
      JOIN trades t ON e.trade_id = t.id
      WHERE e.contractor_id = ${req.contractorId}
        AND e.created_at >= ${startDate}
        AND e.created_at <= ${endDate}
      GROUP BY t.name
      ORDER BY count DESC
    `;
    const estimatesByTrade = [];
    for await (const row of estimatesByTradeGen) {
      estimatesByTrade.push(row);
    }

    const leadsByStatusGen = db.query<{
      status: string;
      count: number;
    }>`
      SELECT 
        status,
        COUNT(*)::int as count
      FROM leads
      WHERE contractor_id = ${req.contractorId}
        AND created_at >= ${startDate}
        AND created_at <= ${endDate}
      GROUP BY status
      ORDER BY count DESC
    `;
    const leadsByStatus = [];
    for await (const row of leadsByStatusGen) {
      leadsByStatus.push(row);
    }

    const revenueByMonthGen = db.query<{
      month: string;
      revenue: number;
      estimateCount: number;
    }>`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM') as month,
        COALESCE(SUM(total_cost), 0) as revenue,
        COUNT(*)::int as "estimateCount"
      FROM estimates
      WHERE contractor_id = ${req.contractorId}
        AND created_at >= ${startDate}
        AND created_at <= ${endDate}
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `;
    const revenueByMonth = [];
    for await (const row of revenueByMonthGen) {
      revenueByMonth.push(row);
    }

    const topZipCodesGen = db.query<{
      zipCode: string;
      count: number;
      totalValue: number;
    }>`
      SELECT 
        zip_code as "zipCode",
        COUNT(*)::int as count,
        COALESCE(SUM(total_cost), 0) as "totalValue"
      FROM estimates
      WHERE contractor_id = ${req.contractorId}
        AND created_at >= ${startDate}
        AND created_at <= ${endDate}
      GROUP BY zip_code
      ORDER BY count DESC
      LIMIT 10
    `;
    const topZipCodes = [];
    for await (const row of topZipCodesGen) {
      topZipCodes.push(row);
    }

    return {
      totalEstimates: totalStats?.totalEstimates || 0,
      totalRevenue: totalStats?.totalRevenue || 0,
      averageEstimateValue: totalStats?.avgEstimateValue || 0,
      conversionRate,
      estimatesByTrade,
      leadsByStatus,
      revenueByMonth,
      topZipCodes,
    };
  }
);
