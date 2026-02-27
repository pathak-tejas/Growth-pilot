import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Zap,
  LineChart,
  MessageSquare,
  Shield,
  Check,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Sales Predictions",
      description: "AI-powered forecast for your sales with 3-month outlook",
    },
    {
      icon: BarChart3,
      title: "Inventory Planning",
      description: "Smart reorder suggestions based on sales patterns",
    },
    {
      icon: LineChart,
      title: "Profit Analysis",
      description: "Detailed margin analysis and optimization advice",
    },
    {
      icon: Zap,
      title: "Marketing Strategy",
      description: "AI-generated campaigns tailored to your business",
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Chat with your business advisor anytime",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business data",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "Forever",
      credits: "100 credits",
      description: "Perfect to get started",
      features: [
        "100 free credits",
        "Basic store management",
        "Sales tracking",
        "Stock management",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "₹499",
      period: "per month",
      credits: "2,000 credits",
      description: "For growing businesses",
      featured: true,
      features: [
        "2,000 monthly credits",
        "Advanced analytics",
        "AI insights & predictions",
        "Report downloads",
        "Priority support",
      ],
    },
    {
      name: "Business",
      price: "₹1,499",
      period: "per month",
      credits: "Unlimited",
      description: "For serious growth",
      features: [
        "Unlimited credits",
        "Advanced AI advisor mode",
        "Priority processing",
        "Custom integrations",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                GP
              </div>
              <span className="text-xl font-bold text-gray-900">
                GrowthPilot AI
              </span>
            </div>
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            🚀 Powered by AI • No credit card required
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Grow Your Shop with
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              AI Insights
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            GrowthPilot AI helps small shop owners make smarter decisions about
            sales, inventory, and marketing with AI-powered insights. Manage
            your business like never before.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="h-12 text-base">
                Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="h-12 text-base border-2"
              >
                View Pricing
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <p className="text-sm text-gray-600 mt-1">Active Users</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <p className="text-sm text-gray-600 mt-1">Credits Used</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <p className="text-sm text-gray-600 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-lg text-gray-600">
              Powerful AI tools designed specifically for small shop owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple & Powerful
            </h2>
            <p className="text-lg text-gray-600">
              Get started in minutes, not days
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", description: "Create your account" },
              {
                step: 2,
                title: "Add Store",
                description: "Set up your shop details",
              },
              {
                step: 3,
                title: "Track Sales",
                description: "Record transactions",
              },
              {
                step: 4,
                title: "Get Insights",
                description: "AI recommendations",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 transition-all duration-300 ${
                  plan.featured
                    ? "border-purple-600 bg-gradient-to-b from-purple-50 to-white shadow-xl md:scale-105"
                    : "border-gray-200 bg-white hover:border-purple-300"
                }`}
              >
                <div className="p-8">
                  {plan.featured && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{plan.period}</div>
                    <div className="mt-4 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold inline-block">
                      {plan.credits}
                    </div>
                  </div>

                  <Link to="/register" className="block mb-6">
                    <Button
                      className="w-full h-11"
                      variant={plan.featured ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>

                  <div className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Join hundreds of small shop owners who are using AI to boost their
            sales and profits.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="h-12 text-base">
              Start Free Today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  GP
                </div>
                <span className="font-bold text-white">GrowthPilot AI</span>
              </div>
              <p className="text-sm">
                AI-powered business growth for small shop owners.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm">
              © 2024 GrowthPilot AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
