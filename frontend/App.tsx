import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Home, FileText, Users, DollarSign, BarChart3, TrendingUp } from "lucide-react";
import HomePage from "./pages/HomePage";
import EstimateFormPage from "./pages/EstimateFormPage";
import ContractorDashboard from "./pages/ContractorDashboard";
import LeadsPage from "./pages/LeadsPage";
import PricingPage from "./pages/PricingPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <nav className="border-b bg-card">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="text-xl font-bold text-foreground">
                  ContractorPro
                </Link>
                <div className="hidden md:flex gap-6">
                  <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Home className="w-4 h-4" />
                    Get Estimate
                  </Link>
                  <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link to="/leads" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Users className="w-4 h-4" />
                    Leads
                  </Link>
                  <Link to="/pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <DollarSign className="w-4 h-4" />
                    Pricing
                  </Link>
                  <Link to="/analytics" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <TrendingUp className="w-4 h-4" />
                    Analytics
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/estimate/:tradeId" element={<EstimateFormPage />} />
              <Route path="/dashboard" element={<ContractorDashboard />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>
          
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}
