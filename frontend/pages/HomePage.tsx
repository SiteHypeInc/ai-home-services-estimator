import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Zap, Wind, Home, Paintbrush, TreePine, Hammer } from "lucide-react";

const tradeIcons: Record<string, any> = {
  plumbing: Wrench,
  electrical: Zap,
  hvac: Wind,
  roofing: Home,
  painting: Paintbrush,
  landscaping: TreePine,
  flooring: Hammer,
};

export default function HomePage() {
  const navigate = useNavigate();

  const trades = [
    { id: 1, name: "Roofing", description: "Roof replacement and repair" },
    { id: 2, name: "HVAC", description: "Heating and cooling systems" },
    { id: 3, name: "Electrical", description: "Wiring and panel upgrades" },
    { id: 4, name: "Plumbing", description: "Pipe and fixture work" },
    { id: 5, name: "Flooring", description: "Floor installation and refinishing" },
    { id: 6, name: "Painting", description: "Interior and exterior painting" },
    { id: 7, name: "General Contracting", description: "Remodels, additions, renovations" },
    { id: 8, name: "Carpentry", description: "Custom carpentry, framing, finish work" },
    { id: 9, name: "Concrete", description: "Concrete pouring, stamping, finishing" },
    { id: 10, name: "Drywall", description: "Drywall installation, taping, finishing" },
    { id: 11, name: "Fencing", description: "Fence installation and repair" },
    { id: 12, name: "Gutters", description: "Gutter installation and cleaning" },
    { id: 13, name: "Landscaping", description: "Lawn care and hardscaping" },
    { id: 14, name: "Siding", description: "Vinyl, fiber cement siding" },
    { id: 15, name: "Windows & Doors", description: "Replacement and installation" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Get Your Instant Estimate
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select your trade below and receive an accurate, region-specific estimate in seconds.
          No waiting, no hassle – just professional pricing tailored to your project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades.map((trade) => {
          const Icon = tradeIcons[trade.name.toLowerCase()] || Wrench;
         
          return (
            <Card
              key={trade.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border-border bg-card"
              onClick={() => navigate(`/estimate/${trade.id}`)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="capitalize text-foreground">{trade.name}</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  {trade.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Get Estimate</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">800+</div>
          <div className="text-sm text-muted-foreground">Zip Codes Covered</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">Regional</div>
          <div className="text-sm text-muted-foreground">Pricing Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">Instant</div>
          <div className="text-sm text-muted-foreground">Estimate Delivery</div>
        </div>
      </div>
    </div>
  );
}
