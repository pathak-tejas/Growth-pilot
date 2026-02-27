import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Zap, Copy, Download } from "lucide-react";
import { useState } from "react";

export default function MarketingAIPage() {
  const [copied, setCopied] = useState(false);

  const strategies = [
    {
      title: "Instagram Campaign",
      content:
        "Post 3x per week with trending hashtags. Focus on user-generated content and behind-the-scenes stories.",
    },
    {
      title: "Email Marketing",
      content:
        "Send weekly newsletters with exclusive discounts and product highlights. Target customers who haven't purchased in 30 days.",
    },
    {
      title: "Social Media Calendar",
      content:
        "Monday: Product showcase, Wednesday: Tips, Friday: Promotions, Sunday: Community engagement.",
    },
  ];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Marketing AI
        </h2>
        <p className="text-gray-600">
          AI-generated marketing strategies tailored to your business
        </p>
      </div>

      {/* Credit Cost */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-indigo-900">Credit Usage</h3>
          <p className="text-sm text-indigo-700">
            Using this feature costs 12 credits per strategy
          </p>
        </div>
        <Button className="flex gap-2">
          <Zap className="w-4 h-4" />
          Generate Strategy
        </Button>
      </div>

      {/* Strategy Cards */}
      <div className="grid gap-6">
        {strategies.map((strategy, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {strategy.title}
            </h3>
            <p className="text-gray-600 mb-4">{strategy.content}</p>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="flex gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
