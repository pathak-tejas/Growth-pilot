import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  subscriptionType: "free" | "pro" | "business";
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { month: "Jan", sales: 4000, profit: 2400 },
    { month: "Feb", sales: 3000, profit: 1398 },
    { month: "Mar", sales: 2000, profit: 9800 },
    { month: "Apr", sales: 2780, profit: 3908 },
    { month: "May", sales: 1890, profit: 4800 },
    { month: "Jun", sales: 2390, profit: 3800 },
  ];

  const modules = [
    {
      title: "Store Management",
      description: "Manage products and sales",
      status: "Active",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Sales Prediction",
      description: "AI-powered sales forecasts",
      status: "Coming Soon",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Inventory Planner",
      description: "Smart inventory management",
      status: "Coming Soon",
      color: "from-orange-600 to-red-600",
    },
    {
      title: "Profit Analysis",
      description: "Detailed profit insights",
      status: "Coming Soon",
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Marketing AI",
      description: "Generate marketing strategies",
      status: "Coming Soon",
      color: "from-indigo-600 to-purple-600",
    },
    {
      title: "AI Assistant",
      description: "Chat with your business advisor",
      status: "Coming Soon",
      color: "from-yellow-600 to-orange-600",
    },
  ];

  return (
    <DashboardLayout
      userName={user?.name}
      credits={user?.credits}
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-gray-600">
          Plan: <span className="font-semibold capitalize text-purple-600">{user?.subscriptionType}</span> • Credits: <span className="font-semibold text-purple-600">{user?.credits}</span>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Sales", value: "₹45,230", change: "+12% this month" },
          { label: "Inventory Items", value: "156", change: "8 low stock" },
          { label: "Avg Profit Margin", value: "28%", change: "+2% vs last month" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#9333ea"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profit Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Modules */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          AI-Powered Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <span className="text-xl">✨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {module.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {module.description}
              </p>
              <Button
                variant={module.status === "Active" ? "default" : "outline"}
                size="sm"
                disabled={module.status !== "Active"}
              >
                {module.status === "Active" ? "Access" : module.status}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
