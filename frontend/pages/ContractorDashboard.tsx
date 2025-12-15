import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText, Users, TrendingUp } from "lucide-react";

export default function ContractorDashboard() {
  // Using contractor ID 1 for demo purposes
  const contractorId = 1;
  
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["dashboard", contractorId],
    queryFn: async () => backend.contractor.getDashboard({ contractorId }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your contractor business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Estimates</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboard.totalEstimates}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Leads</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboard.pendingLeads}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${dashboard.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboard.conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Estimates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboard.recentEstimates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No estimates yet</div>
            ) : (
              dashboard.recentEstimates.map((estimate) => (
                <div 
                  key={estimate.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{estimate.customerName}</div>
                    <div className="text-sm text-muted-foreground capitalize">{estimate.tradeName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${estimate.totalCost.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground capitalize">{estimate.status}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
