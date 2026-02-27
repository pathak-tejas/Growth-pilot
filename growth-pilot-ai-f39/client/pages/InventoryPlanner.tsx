import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Zap, AlertTriangle } from "lucide-react";

export default function InventoryPlannerPage() {
  const reorderData = [
    { product: "Product A", current: 15, suggested: 50, leadTime: "7 days" },
    { product: "Product B", current: 8, suggested: 75, leadTime: "5 days" },
    { product: "Product C", current: 120, suggested: 80, leadTime: "10 days" },
    { product: "Product D", current: 2, suggested: 40, leadTime: "3 days" },
  ];

  const chartData = [
    { name: "Product A", current: 15, suggested: 50 },
    { name: "Product B", current: 8, suggested: 75 },
    { name: "Product C", current: 120, suggested: 80 },
    { name: "Product D", current: 2, suggested: 40 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Inventory Planner AI
        </h2>
        <p className="text-gray-600">
          Smart inventory management based on sales patterns
        </p>
      </div>

      {/* Credit Cost */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-orange-900">Credit Usage</h3>
          <p className="text-sm text-orange-700">
            Using this feature costs 8 credits per analysis
          </p>
        </div>
        <Button className="flex gap-2">
          <Zap className="w-4 h-4" />
          Get Suggestions
        </Button>
      </div>

      {/* Reorder Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recommended Stock Levels
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="current" fill="#ef4444" name="Current Stock" />
            <Bar dataKey="suggested" fill="#10b981" name="Suggested Stock" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Reorder Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Reorder Recommendations
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Suggested Level
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Lead Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reorderData.map((item, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.current} units
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.suggested} units
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.leadTime}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.current < item.suggested * 0.3 ? (
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <AlertTriangle className="w-4 h-4" />
                        Urgent
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
