import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface Payment {
  id: string;
  date: Date;
  plan: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  invoiceId: string;
}

export default function PaymentsPage() {
  const payments: Payment[] = [
    {
      id: "1",
      date: new Date("2024-11-01"),
      plan: "Pro",
      amount: 499,
      status: "completed",
      invoiceId: "INV-001",
    },
    {
      id: "2",
      date: new Date("2024-10-01"),
      plan: "Pro",
      amount: 499,
      status: "completed",
      invoiceId: "INV-002",
    },
    {
      id: "3",
      date: new Date("2024-09-01"),
      plan: "Pro",
      amount: 499,
      status: "completed",
      invoiceId: "INV-003",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment History
        </h2>
        <p className="text-gray-600">View and manage your subscriptions</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-2">
              Current Plan: Pro
            </h3>
            <p className="text-sm text-purple-700 mb-4">
              ₹499/month • 2,000 credits monthly
            </p>
            <p className="text-sm text-purple-700">
              Next billing date: December 1, 2024
            </p>
          </div>
          <div className="text-right">
            <Button className="mb-2">Upgrade to Business</Button>
            <Button variant="outline" className="w-full">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Credit Card ending in 4242
            </p>
            <p className="text-xs text-gray-600 mt-1">Expires 12/25</p>
          </div>
          <Button variant="outline" size="sm">
            Change
          </Button>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Billing History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
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
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {payment.invoiceId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.plan}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₹{payment.amount}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <Button size="sm" variant="outline" className="flex gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex gap-2">
                      <Download className="w-4 h-4" />
                      Download
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
