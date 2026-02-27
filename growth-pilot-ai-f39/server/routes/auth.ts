import { RequestHandler } from "express";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

// In-memory user store (replace with database in production)
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  credits: number;
  subscriptionType: "free" | "pro" | "business";
  createdAt: Date;
}

const users: Map<string, User> = new Map();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-prod";

// Hash password with bcrypt-like approach (simple implementation)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Verify password
function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Register handler
export const handleRegister: RequestHandler = (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(
      (u) => u.email === email
    );
    if (existingUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    // Create new user
    const userId = crypto.randomUUID();
    const user: User = {
      id: userId,
      name,
      email,
      passwordHash: hashPassword(password),
      credits: 100, // 100 free credits on registration
      subscriptionType: "free",
      createdAt: new Date(),
    };

    users.set(userId, user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
        subscriptionType: user.subscriptionType,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login handler
export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: "Missing email or password" });
      return;
    }

    // Find user
    const user = Array.from(users.values()).find((u) => u.email === email);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Verify password
    if (!verifyPassword(password, user.passwordHash)) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
        subscriptionType: user.subscriptionType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware to verify JWT token
export const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Missing token" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    (req as any).userId = decoded.userId;
    (req as any).userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get current user
export const handleGetUser: RequestHandler = (req, res) => {
  try {
    const userId = (req as any).userId;
    const user = users.get(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        credits: user.credits,
        subscriptionType: user.subscriptionType,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
