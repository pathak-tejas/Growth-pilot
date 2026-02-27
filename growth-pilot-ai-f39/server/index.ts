import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleRegister, handleLogin, verifyToken, handleGetUser } from "./routes/auth";
import { handleGetProducts, handleAddProduct, handleRecordSale, handleGetSales } from "./routes/store";
import { handleDeductCredits, handleGetUsageHistory, handleGetCreditCosts } from "./routes/credits";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/user", verifyToken, handleGetUser);

  // Store management routes
  app.get("/api/store/products", verifyToken, handleGetProducts);
  app.post("/api/store/products", verifyToken, handleAddProduct);
  app.get("/api/store/sales", verifyToken, handleGetSales);
  app.post("/api/store/sales", verifyToken, handleRecordSale);

  // Credit system routes
  app.post("/api/credits/deduct", verifyToken, handleDeductCredits);
  app.get("/api/credits/history", verifyToken, handleGetUsageHistory);
  app.get("/api/credits/costs", handleGetCreditCosts);

  return app;
}
