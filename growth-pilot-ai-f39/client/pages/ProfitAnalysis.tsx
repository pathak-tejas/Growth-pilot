import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Zap } from "lucide-react";

export default function ProfitAnalysisPage() {
  const marginData = [
    { category: "Electronics", margin: 35, color: "#9333ea" },
    { category: "Clothing", margin: 28, color: "#3b82f6" },
    { category: "Accessories", margin: 42, color: "#10b981" },
    { category: "Food", margin: 15, color: "#f59e0b" },
  ];

  const profitByMonth = [
    { month: "Jan", profit: 12000, revenue: 45000, costs: 33000 },
    { month: "Feb", profit: 14000, revenue: 52000, costs: 38000 },
    { month: "Mar", profit: 16000, revenue: 58000, costs: 42000 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Profit Analysis AI
        </h2>
        <p className="text-gray-600">
          Detailed margin analysis and optimization advice
        </p>
      </div>

      {/* Credit Cost */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-green-900">Credit Usage</h3>
          <p className="text-sm text-green-700">
            Using this feature costs 6 credits per analysis
          </p>
        </div>
        <Button className="flex gap-2">
          <Zap className="w-4 h-4" />
          Analyze Now
        </Button>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Margin by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marginData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, margin }) => `${category}: ${margin}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="margin"
              >
                {marginData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profit Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#10b981" name="Profit" />
              <Bar dataKey="costs" fill="#ef4444" name="Costs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            label: "Average Margin",
            value: "30%",
            change: "+2% vs last month",
          },
          {
            label: "Break-even Point",
            value: "₹25,000",
            change: "Monthly",
          },
          {
            label: "Best Category",
            value: "Accessories",
            change: "42% margin",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <p className="text-gray-600 text-sm font-medium mb-2">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
