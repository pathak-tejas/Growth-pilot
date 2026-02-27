import { RequestHandler } from "express";

interface Product {
  id: string;
  userId: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  initialStock: number;
  currentStock: number;
  totalSold: number;
  createdAt: Date;
}

interface Sale {
  id: string;
  userId: string;
  productId: string;
  quantitySold: number;
  revenue: number;
  profit: number;
  createdAt: Date;
}

// In-memory store (replace with database)
const products: Map<string, Product[]> = new Map();
const sales: Map<string, Sale[]> = new Map();

// Get user products
export const handleGetProducts: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const userProducts = products.get(userId) || [];
    res.json({ products: userProducts });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add product
export const handleAddProduct: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const { name, category, costPrice, sellingPrice, initialStock } = req.body;

    if (!name || !category || !costPrice || !sellingPrice || !initialStock) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      userId,
      name,
      category,
      costPrice: parseFloat(costPrice),
      sellingPrice: parseFloat(sellingPrice),
      initialStock: parseInt(initialStock),
      currentStock: parseInt(initialStock),
      totalSold: 0,
      createdAt: new Date(),
    };

    if (!products.has(userId)) {
      products.set(userId, []);
    }

    products.get(userId)!.push(newProduct);
    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Record sale
export const handleRecordSale: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const { productId, quantitySold } = req.body;

    if (!productId || !quantitySold) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const userProducts = products.get(userId) || [];
    const product = userProducts.find((p) => p.id === productId);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (product.currentStock < quantitySold) {
      res.status(400).json({ error: "Insufficient stock" });
      return;
    }

    const quantity = parseInt(quantitySold);
    const revenue = product.sellingPrice * quantity;
    const profit = (product.sellingPrice - product.costPrice) * quantity;

    const newSale: Sale = {
      id: Date.now().toString(),
      userId,
      productId,
      quantitySold: quantity,
      revenue,
      profit,
      createdAt: new Date(),
    };

    // Update product stock
    product.currentStock -= quantity;
    product.totalSold += quantity;

    if (!sales.has(userId)) {
      sales.set(userId, []);
    }
    sales.get(userId)!.push(newSale);

    res.status(201).json({ sale: newSale });
  } catch (error) {
    console.error("Record sale error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user sales
export const handleGetSales: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const userSales = sales.get(userId) || [];
    res.json({ sales: userSales });
  } catch (error) {
    console.error("Get sales error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
