import { Button } from "@/components/ui/button";
import { AlertTriangle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface CreditsExhaustedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  featureName: string;
}

export default function CreditsExhaustedModal({
  isOpen,
  onClose,
  currentCredits,
  featureName,
}: CreditsExhaustedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Credits Exhausted
        </h2>

        <p className="text-gray-600 text-center mb-6">
          You have {currentCredits} credits remaining. Using {featureName} requires
          more credits than you have available.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">
            <span className="font-semibold">Current Credits:</span> {currentCredits}
          </p>
        </div>

        <div className="space-y-3">
          <Link to="/dashboard/payments" className="block">
            <Button className="w-full flex gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Upgrade Your Plan
            </Button>
          </Link>

          <Button variant="outline" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Free plan: 100 credits<br />
          Pro plan: 2,000 credits/month<br />
          Business plan: Unlimited
        </p>
      </div>
    </div>
  );
}
