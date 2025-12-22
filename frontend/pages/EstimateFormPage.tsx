import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
/*import { TRADE_FORM_SCHEMA } from "../../data/tradeFormSchema";*/

// Hard-coded trade form schema from old working version
const TRADE_FORM_SCHEMA = {
  roofing: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'roofType', label: 'Roof Type', type: 'select', options: ['Asphalt Shingle', 'Metal', 'Tile', 'Flat'], required: true },
    { name: 'stories', label: 'Number of Stories', type: 'number', required: true }
  ],
  hvac: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'systemType', label: 'System Type', type: 'select', options: ['Central AC', 'Heat Pump', 'Furnace', 'Ductless Mini-Split'], required: true },
    { name: 'units', label: 'Number of Units', type: 'number', required: true }
  ],
  electrical: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Panel Upgrade', 'Rewiring', 'New Outlets', 'Lighting'], required: true }
  ],
  plumbing: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Repiping', 'Drain Cleaning', 'Water Heater', 'Fixture Installation'], required: true },
    { name: 'bathrooms', label: 'Number of Bathrooms', type: 'number', required: true }
  ],
  flooring: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'floorType', label: 'Floor Type', type: 'select', options: ['Hardwood', 'Laminate', 'Tile', 'Carpet', 'Vinyl'], required: true },
    { name: 'rooms', label: 'Number of Rooms', type: 'number', required: true }
  ],
  painting: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'paintType', label: 'Paint Type', type: 'select', options: ['Interior', 'Exterior', 'Both'], required: true },
    { name: 'rooms', label: 'Number of Rooms', type: 'number', required: true }
  ],
  general_contracting: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'select', options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'], required: true },
    { name: 'zip', label: 'ZIP Code', type: 'text', required: true },
    { name: 'squareFeet', label: 'Square Feet', type: 'number', required: true },
    { name: 'projectType', label: 'Project Type', type: 'select', options: ['Remodel', 'Addition', 'New Construction', 'Renovation'], required: true },
    { name: 'projectDetails', label: 'Project Details', type: 'textarea', required: true }
  ]
} as const;


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

  // Hard-coded trades list (no backend fetch needed)
  const trades = [
    { id: 1, name: "Roofing", key: "roofing" },
    { id: 2, name: "HVAC", key: "hvac" },
    { id: 3, name: "Electrical", key: "electrical" },
    { id: 4, name: "Plumbing", key: "plumbing" },
    { id: 5, name: "Flooring", key: "flooring" },
    { id: 6, name: "Painting", key: "painting" },
    { id: 7, name: "General Contracting", key: "general_contracting" },
    // Add the rest of your trades here with their keys matching TRADE_FORM_SCHEMA
  ];

  const trade = trades.find(t => t.id === parseInt(tradeId || "1")) || trades[0]; // fallback to first trade

  const createEstimate = useMutation({
    mutationFn: async () => {
      const contractorId = 1; // demo
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

<form onSubmit={handleSubmit} className="space-y-6">
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
    <Label htmlFor="customerAddress" className="text-foreground">Project Address</Label>
    <Input
      id="customerAddress"
      value={formData.customerAddress}
      onChange={(e) => setFormData(prev => ({ ...prev, customerAddress: e.target.value }))}
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

  <div className="border-t border-border pt-6">
    <h3 className="font-semibold mb-4 text-foreground">Project Details</h3>
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-foreground">
            {field.label} {field.required && "*"}
          </Label>
          
          {field.type === "number" && (
            <Input
              id={field.name}
              type="number"
              required={field.required}
              onChange={(e) => handleFieldChange(field.name, parseFloat(e.target.value) || 0)}
              className="bg-background border-input"
            />
          )}
          
          {field.type === "text" && (
            <Input
              id={field.name}
              type="text"
              required={field.required}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="bg-background border-input"
            />
          )}
          
          {field.type === "email" && (
            <Input
              id={field.name}
              type="email"
              required={field.required}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="bg-background border-input"
            />
          )}
          
          {field.type === "tel" && (
            <Input
              id={field.name}
              type="tel"
              required={field.required}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="bg-background border-input"
            />
          )}
          
          {field.type === "select" && field.options && (
            <Select
              required={field.required}
              onValueChange={(value) => handleFieldChange(field.name, value)}
            >
              <SelectTrigger className="bg-background border-input">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {field.type === "textarea" && (
            <Textarea
              id={field.name}
              required={field.required}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="bg-background border-input"
            />
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
export default EstimateFormPage;
