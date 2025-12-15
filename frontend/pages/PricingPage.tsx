import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign } from "lucide-react";

export default function PricingPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTradeId, setSelectedTradeId] = useState<number>(1);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [customPrices, setCustomPrices] = useState<Record<string, { labor?: number; material?: number }>>({});
  
  // Using contractor ID 1 for demo purposes
  const contractorId = 1;
  
  const { data: trades } = useQuery({
    queryKey: ["trades"],
    queryFn: async () => backend.trade.list(),
  });

  const { data: basePrices, isLoading } = useQuery({
    queryKey: ["basePrices", selectedTradeId],
    queryFn: async () => backend.pricing.getBasePrices({ tradeId: selectedTradeId }),
    enabled: !!selectedTradeId,
  });

  const { data: existingCustomPrices } = useQuery({
    queryKey: ["customPrices", contractorId],
    queryFn: async () => backend.pricing.getCustomPricing({ contractorId }),
  });

  const updatePricing = useMutation({
    mutationFn: async ({ itemCode, labor, material }: { itemCode: string; labor?: number; material?: number }) => {
      await backend.pricing.updateCustomPricing({
        contractorId,
        itemCode,
        customLaborRate: labor,
        customMaterialCost: material,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customPrices"] });
      toast({
        title: "Pricing Updated",
        description: "Custom pricing has been saved successfully.",
      });
      setEditingItem(null);
      setCustomPrices({});
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update pricing.",
        variant: "destructive",
      });
    },
  });

  const handleSaveCustomPrice = (itemCode: string) => {
    const prices = customPrices[itemCode];
    if (!prices) return;
    
    updatePricing.mutate({
      itemCode,
      labor: prices.labor,
      material: prices.material,
    });
  };

  const getCustomPrice = (itemCode: string) => {
    return existingCustomPrices?.customPrices.find(p => p.itemCode === itemCode);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pricing Management</h1>
        <p className="text-muted-foreground">Customize your pricing for different services</p>
      </div>

      <div className="flex gap-4">
        <div className="w-64">
          <Label className="text-foreground">Select Trade</Label>
          <Select value={selectedTradeId.toString()} onValueChange={(val) => setSelectedTradeId(parseInt(val))}>
            <SelectTrigger className="bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {trades?.trades.map((trade) => (
                <SelectItem key={trade.id} value={trade.id.toString()} className="capitalize">
                  {trade.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading prices...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {basePrices?.prices.map((price) => {
            const customPrice = getCustomPrice(price.itemCode);
            const isEditing = editingItem === price.itemCode;
            const editValues = customPrices[price.itemCode] || {};
            
            return (
              <Card key={price.id} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">{price.itemName}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Item Code: {price.itemCode} • Unit: {price.unit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-sm text-muted-foreground">Base Labor Rate</Label>
                      <div className="text-lg font-semibold text-foreground mt-1">
                        ${price.baseLaborRate.toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground">Base Material Cost</Label>
                      <div className="text-lg font-semibold text-foreground mt-1">
                        ${price.baseMaterialCost.toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground">Total Base Cost</Label>
                      <div className="text-lg font-semibold text-foreground mt-1">
                        ${(price.baseLaborRate + price.baseMaterialCost).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-semibold text-foreground">Custom Pricing</Label>
                      {!isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingItem(price.itemCode);
                            setCustomPrices({
                              ...customPrices,
                              [price.itemCode]: {
                                labor: customPrice?.customLaborRate || price.baseLaborRate,
                                material: customPrice?.customMaterialCost || price.baseMaterialCost,
                              },
                            });
                          }}
                        >
                          Customize
                        </Button>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-foreground">Custom Labor Rate</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={editValues.labor || ""}
                              onChange={(e) => setCustomPrices({
                                ...customPrices,
                                [price.itemCode]: {
                                  ...editValues,
                                  labor: parseFloat(e.target.value) || 0,
                                },
                              })}
                              className="bg-background border-input"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-foreground">Custom Material Cost</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={editValues.material || ""}
                              onChange={(e) => setCustomPrices({
                                ...customPrices,
                                [price.itemCode]: {
                                  ...editValues,
                                  material: parseFloat(e.target.value) || 0,
                                },
                              })}
                              className="bg-background border-input"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button onClick={() => handleSaveCustomPrice(price.itemCode)}>
                            Save Custom Pricing
                          </Button>
                          <Button variant="outline" onClick={() => {
                            setEditingItem(null);
                            const newPrices = { ...customPrices };
                            delete newPrices[price.itemCode];
                            setCustomPrices(newPrices);
                          }}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : customPrice ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Custom Labor</div>
                          <div className="text-lg font-semibold text-primary">
                            ${customPrice.customLaborRate?.toFixed(2) || "—"}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Custom Material</div>
                          <div className="text-lg font-semibold text-primary">
                            ${customPrice.customMaterialCost?.toFixed(2) || "—"}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Custom Total</div>
                          <div className="text-lg font-semibold text-primary">
                            ${((customPrice.customLaborRate || 0) + (customPrice.customMaterialCost || 0)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No custom pricing set. Using base rates.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
