import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function EstimateFormPage() {
  const { tradeId } = useParams<{ tradeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    zipCode: "",
    projectDetails: {} as Record<string, any>,
  });

  const { data: trade, isLoading } = useQuery({
    queryKey: ["trade", tradeId],
    queryFn: async () => backend.trade.get({ id: parseInt(tradeId!) }),
    enabled: !!tradeId,
  });

  const createEstimate = useMutation({
    mutationFn: async () => {
      // Using contractor ID 1 for demo purposes
      const contractorId = 1;
      
      return backend.estimate.create({
        contractorId,
        tradeId: parseInt(tradeId!),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        zipCode: formData.zipCode,
        projectDetails: formData.projectDetails,
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Estimate Created!",
        description: `Your estimate total is $${data.totalCost.toFixed(2)}`,
      });
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create estimate. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEstimate.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading form...</div>
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Trade not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Trades
      </Button>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="capitalize text-foreground">{trade.name} Estimate</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill out the form below to receive your instant estimate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-foreground">Name *</Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className="bg-background border-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerEmail" className="text-foreground">Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  className="bg-background border-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerPhone" className="text-foreground">Phone</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                  className="bg-background border-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-foreground">Zip Code *</Label>
                <Input
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                  className="bg-background border-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerAddress" className="text-foreground">Project Address</Label>
              <Input
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, customerAddress: e.target.value }))}
                className="bg-background border-input"
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4 text-foreground">Project Details</h3>
              <div className="space-y-4">
                {trade.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.fieldName} className="text-foreground">
                      {field.fieldLabel} {field.required && "*"}
                    </Label>
                    
                    {field.fieldType === "number" && (
                      <Input
                        id={field.fieldName}
                        type="number"
                        required={field.required}
                        onChange={(e) => handleFieldChange(field.fieldName, parseFloat(e.target.value) || 0)}
                        className="bg-background border-input"
                      />
                    )}
                    
                    {field.fieldType === "text" && (
                      <Textarea
                        id={field.fieldName}
                        required={field.required}
                        onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                        className="bg-background border-input"
                      />
                    )}
                    
                    {field.fieldType === "select" && field.fieldOptions && (
                      <Select
                        required={field.required}
                        onValueChange={(value) => handleFieldChange(field.fieldName, value)}
                      >
                        <SelectTrigger className="bg-background border-input">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.fieldOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={createEstimate.isPending}
            >
              {createEstimate.isPending ? "Creating Estimate..." : "Get Instant Estimate"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
