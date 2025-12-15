import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500",
  contacted: "bg-purple-500/10 text-purple-500",
  qualified: "bg-yellow-500/10 text-yellow-500",
  proposal_sent: "bg-orange-500/10 text-orange-500",
  won: "bg-green-500/10 text-green-500",
  lost: "bg-red-500/10 text-red-500",
};

export default function LeadsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  
  // Using contractor ID 1 for demo purposes
  const contractorId = 1;
  
  const { data, isLoading } = useQuery({
    queryKey: ["leads", contractorId, filterStatus],
    queryFn: async () => backend.lead.list({ 
      contractorId,
      status: filterStatus === "all" ? undefined : filterStatus,
    }),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await backend.lead.updateStatus({ id, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast({
        title: "Status Updated",
        description: "Lead status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update lead status.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Leads</h1>
          <p className="text-muted-foreground">Manage and follow up with your leads</p>
        </div>
        
        <Select value={filterStatus || "all"} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48 bg-background border-input">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data?.leads.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">No leads found</div>
            </CardContent>
          </Card>
        ) : (
          data?.leads.map((lead) => (
            <Card key={lead.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground">{lead.customerName}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={statusColors[lead.status]}>
                        {lead.status.replace(/_/g, " ")}
                      </Badge>
                      <Badge variant="outline" className="capitalize text-muted-foreground">
                        {lead.tradeName}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">${lead.totalCost.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Estimate Value</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${lead.customerEmail}`} className="hover:text-foreground transition-colors">
                      {lead.customerEmail}
                    </a>
                  </div>
                  {lead.customerPhone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${lead.customerPhone}`} className="hover:text-foreground transition-colors">
                        {lead.customerPhone}
                      </a>
                    </div>
                  )}
                </div>

                {lead.notes && (
                  <div className="p-3 bg-background rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground">Notes</div>
                    <div className="text-sm text-foreground mt-1">{lead.notes}</div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Created {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                  
                  <Select
                    value={lead.status}
                    onValueChange={(status) => updateStatus.mutate({ id: lead.id, status })}
                  >
                    <SelectTrigger className="w-40 bg-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
