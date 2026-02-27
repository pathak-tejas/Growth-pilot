import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import CreditsExhaustedModal from "@/components/CreditsExhaustedModal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Zap } from "lucide-react";
import { useState } from "react";

const FEATURE_NAME = "Sales Prediction";
const CREDIT_COST = 10;

export default function SalesPredictionPage() {
  const [showModal, setShowModal] = useState(false);
  const [credits, setCredits] = useState(850); // Mock user credits

  const forecastData = [
    { month: "Current", actual: 4500, forecast: 4500 },
    { month: "Next Month", actual: null, forecast: 5200 },
    { month: "+2 Months", actual: null, forecast: 5800 },
    { month: "+3 Months", actual: null, forecast: 6400 },
  ];

  const handleAnalyze = () => {
    if (credits < CREDIT_COST) {
      setShowModal(true);
    } else {
      // Deduct credits
      setCredits(credits - CREDIT_COST);
      // In production, call API to save usage and deduct credits
    }
  };

  return (
    <DashboardLayout>
      <CreditsExhaustedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentCredits={credits}
        featureName={FEATURE_NAME}
      />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sales Prediction AI
        </h2>
        <p className="text-gray-600">
          Get 3-month sales forecasts powered by machine learning
        </p>
      </div>

      {/* Credit Cost */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-purple-900">Credit Usage</h3>
          <p className="text-sm text-purple-700">
            Using this feature costs {CREDIT_COST} credits per analysis
          </p>
        </div>
        <Button
          className="flex gap-2"
          onClick={handleAnalyze}
          disabled={credits < CREDIT_COST}
        >
          <Zap className="w-4 h-4" />
          {credits < CREDIT_COST ? "No Credits" : "Analyze Now"}
        </Button>
      </div>

      {/* Forecast Chart */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            3-Month Sales Forecast
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#9333ea"
                strokeWidth={2}
                name="Actual Sales"
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecasted Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Key Insights
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Expected growth: +15% next month</li>
              <li>✓ Peak sales: Month 3</li>
              <li>✓ Risk level: Low</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Recommendations
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📦 Increase inventory by 20%</li>
              <li>📢 Boost marketing budget</li>
              <li>👥 Hire more staff</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
