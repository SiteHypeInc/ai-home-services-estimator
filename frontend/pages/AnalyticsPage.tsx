import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

export default function AnalyticsPage() {
  const contractorId = 1;

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", contractorId],
    queryFn: async () => backend.analytics.getDashboardStats({ contractorId }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  const stats = data;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your business performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Estimates</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats?.totalEstimates || 0}</div>
            <p className="text-xs text-muted-foreground">Last 90 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${stats?.totalRevenue.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">From estimates</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Estimate Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${stats?.averageEstimateValue.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">Per estimate</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats?.conversionRate.toFixed(1) || '0.0'}%</div>
            <p className="text-xs text-muted-foreground">Leads to customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Estimates by Trade</CardTitle>
            <CardDescription className="text-muted-foreground">Breakdown of services requested</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.estimatesByTrade.map((trade) => (
                <div key={trade.tradeName} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground capitalize">{trade.tradeName}</div>
                    <div className="text-sm text-muted-foreground">{trade.count} estimates</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${trade.totalValue.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Leads by Status</CardTitle>
            <CardDescription className="text-muted-foreground">Current lead pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.leadsByStatus.map((status) => (
                <div key={status.status} className="flex items-center justify-between">
                  <div className="font-medium text-foreground capitalize">{status.status.replace(/_/g, ' ')}</div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{status.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Revenue by Month</CardTitle>
          <CardDescription className="text-muted-foreground">Monthly revenue trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.revenueByMonth.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{month.month}</div>
                  <div className="text-sm text-muted-foreground">{month.estimateCount} estimates</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-foreground">${month.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Top Zip Codes</CardTitle>
          <CardDescription className="text-muted-foreground">Most active service areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.topZipCodes.map((zipCode) => (
              <div key={zipCode.zipCode} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{zipCode.zipCode}</div>
                  <div className="text-sm text-muted-foreground">{zipCode.count} estimates</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">${zipCode.totalValue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
