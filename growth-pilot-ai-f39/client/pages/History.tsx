import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download, Trash2, FileText } from "lucide-react";

interface Report {
  id: string;
  title: string;
  feature: string;
  creditsUsed: number;
  createdAt: Date;
  status: "completed" | "processing";
}

export default function HistoryPage() {
  const reports: Report[] = [
    {
      id: "1",
      title: "Sales Prediction Report - November",
      feature: "Sales Prediction",
      creditsUsed: 10,
      createdAt: new Date("2024-11-15"),
      status: "completed",
    },
    {
      id: "2",
      title: "Inventory Reorder Analysis",
      feature: "Inventory Planner",
      creditsUsed: 8,
      createdAt: new Date("2024-11-14"),
      status: "completed",
    },
    {
      id: "3",
      title: "Profit Margin Analysis Q4",
      feature: "Profit Analysis",
      creditsUsed: 6,
      createdAt: new Date("2024-11-10"),
      status: "completed",
    },
    {
      id: "4",
      title: "Marketing Strategy Generator",
      feature: "Marketing AI",
      creditsUsed: 12,
      createdAt: new Date("2024-11-05"),
      status: "completed",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">History</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Filter by feature..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Credits Used
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-purple-600" />
                      {report.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.feature}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                      {report.creditsUsed}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <Button size="sm" variant="outline" className="flex gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
