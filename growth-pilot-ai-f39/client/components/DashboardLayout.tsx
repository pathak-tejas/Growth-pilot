import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Store,
  TrendingUp,
  Package,
  BarChart3,
  Zap,
  MessageSquare,
  Clock,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  credits?: number;
}

export default function DashboardLayout({
  children,
  userName,
  credits,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Store,
      label: "Store Management",
      href: "/dashboard/store",
    },
    {
      icon: TrendingUp,
      label: "Sales Prediction",
      href: "/dashboard/sales",
    },
    {
      icon: Package,
      label: "Inventory Planner",
      href: "/dashboard/inventory",
    },
    {
      icon: BarChart3,
      label: "Profit Analysis",
      href: "/dashboard/profit",
    },
    {
      icon: Zap,
      label: "Marketing AI",
      href: "/dashboard/marketing",
    },
    {
      icon: MessageSquare,
      label: "AI Assistant",
      href: "/dashboard/chat",
    },
    {
      divider: true,
    },
    {
      icon: Clock,
      label: "History",
      href: "/dashboard/history",
    },
    {
      icon: CreditCard,
      label: "Payment History",
      href: "/dashboard/payments",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              GP
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">
                  GrowthPilot
                </span>
                <span className="text-xs text-gray-500">AI</span>
              </div>
            )}
          </Link>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-900">{userName || "User"}</p>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                {credits || 0} credits
              </span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={index}
                  className="my-4 border-t border-gray-200"
                />
              );
            }

            const Icon = item.icon as React.ElementType;
            const active = isActive(item.href!);

            return (
              <Link
                key={index}
                to={item.href!}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 mb-2 ${
                  active
                    ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-medium border-l-4 border-purple-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    active ? "text-purple-600" : "text-gray-400"
                  }`}
                />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>

        {/* Toggle Sidebar */}
        <div className="border-t border-gray-200 p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName || "User"}</p>
              <p className="text-xs text-gray-500">
                {credits || 0} credits available
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
