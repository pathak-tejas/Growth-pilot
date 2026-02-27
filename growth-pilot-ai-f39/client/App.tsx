import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StoreManagement from "./pages/StoreManagement";
import SalesPrediction from "./pages/SalesPrediction";
import InventoryPlanner from "./pages/InventoryPlanner";
import ProfitAnalysis from "./pages/ProfitAnalysis";
import MarketingAI from "./pages/MarketingAI";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/store" element={<StoreManagement />} />
          <Route path="/dashboard/sales" element={<SalesPrediction />} />
          <Route path="/dashboard/inventory" element={<InventoryPlanner />} />
          <Route path="/dashboard/profit" element={<ProfitAnalysis />} />
          <Route path="/dashboard/marketing" element={<MarketingAI />} />
          <Route path="/dashboard/chat" element={<Chat />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
