import { RequestHandler } from "express";

interface AIUsage {
  id: string;
  userId: string;
  feature: string;
  creditsSpent: number;
  createdAt: Date;
}

// In-memory usage tracking (replace with database)
const aiUsage: Map<string, AIUsage[]> = new Map();

// Credit costs for different features
const creditCosts = {
  "Sales Prediction": 10,
  "Inventory Planner": 8,
  "Profit Analysis": 6,
  "Marketing AI": 12,
  "AI Chat": 2,
};

// Deduct credits for AI feature usage
export const handleDeductCredits: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const { feature } = req.body;

    if (!feature || !Object.keys(creditCosts).includes(feature)) {
      res.status(400).json({ error: "Invalid feature" });
      return;
    }

    const cost = creditCosts[feature as keyof typeof creditCosts];

    const newUsage: AIUsage = {
      id: Date.now().toString(),
      userId,
      feature,
      creditsSpent: cost,
      createdAt: new Date(),
    };

    if (!aiUsage.has(userId)) {
      aiUsage.set(userId, []);
    }

    aiUsage.get(userId)!.push(newUsage);

    res.json({
      message: `${cost} credits deducted for ${feature}`,
      creditsSpent: cost,
      usage: newUsage,
    });
  } catch (error) {
    console.error("Deduct credits error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get AI usage history
export const handleGetUsageHistory: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const userUsage = aiUsage.get(userId) || [];

    const totalCreditsUsed = userUsage.reduce(
      (sum, item) => sum + item.creditsSpent,
      0
    );

    res.json({
      usage: userUsage,
      totalCreditsUsed,
    });
  } catch (error) {
    console.error("Get usage history error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get credit costs
export const handleGetCreditCosts: RequestHandler = (_req, res) => {
  res.json({ creditCosts });
};
