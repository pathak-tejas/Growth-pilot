import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit2,
  Trash2,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  initialStock: number;
  currentStock: number;
  totalSold: number;
}

export default function StoreManagementPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Sample Product 1",
      category: "Electronics",
      costPrice: 500,
      sellingPrice: 999,
      initialStock: 50,
      currentStock: 45,
      totalSold: 5,
    },
    {
      id: "2",
      name: "Sample Product 2",
      category: "Clothing",
      costPrice: 200,
      sellingPrice: 499,
      initialStock: 100,
      currentStock: 8,
      totalSold: 92,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    initialStock: "",
  });
  const [saleData, setSaleData] = useState({
    productId: "",
    quantity: "",
  });

  const handleAddProduct = () => {
    if (
      formData.name &&
      formData.category &&
      formData.costPrice &&
      formData.sellingPrice &&
      formData.initialStock
    ) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        costPrice: parseFloat(formData.costPrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        initialStock: parseInt(formData.initialStock),
        currentStock: parseInt(formData.initialStock),
        totalSold: 0,
      };
      setProducts([...products, newProduct]);
      setFormData({
        name: "",
        category: "",
        costPrice: "",
        sellingPrice: "",
        initialStock: "",
      });
      setShowAddForm(false);
    }
  };

  const handleRecordSale = () => {
    if (saleData.productId && saleData.quantity) {
      const quantity = parseInt(saleData.quantity);
      setProducts(
        products.map((p) => {
          if (p.id === saleData.productId) {
            const newStock = Math.max(0, p.currentStock - quantity);
            return {
              ...p,
              currentStock: newStock,
              totalSold: p.totalSold + quantity,
            };
          }
          return p;
        })
      );
      setSaleData({ productId: "", quantity: "" });
      setShowSaleForm(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getLowStockAlert = (product: Product) => {
    const threshold = product.initialStock * 0.2;
    return product.currentStock < threshold;
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Store Management
        </h2>

        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSaleForm(!showSaleForm)}
            className="flex gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Record Sale
          </Button>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="number"
              placeholder="Cost Price"
              value={formData.costPrice}
              onChange={(e) =>
                setFormData({ ...formData, costPrice: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="number"
              placeholder="Selling Price"
              value={formData.sellingPrice}
              onChange={(e) =>
                setFormData({ ...formData, sellingPrice: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="number"
              placeholder="Initial Stock"
              value={formData.initialStock}
              onChange={(e) =>
                setFormData({ ...formData, initialStock: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddProduct}>Add Product</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Record Sale Form */}
      {showSaleForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Record a Sale</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <select
              value={saleData.productId}
              onChange={(e) =>
                setSaleData({ ...saleData, productId: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.currentStock} available)
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity Sold"
              value={saleData.quantity}
              onChange={(e) =>
                setSaleData({ ...saleData, quantity: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleRecordSale}>Record Sale</Button>
            <Button variant="outline" onClick={() => setShowSaleForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({products.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Margin
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const margin = product.sellingPrice - product.costPrice;
                const marginPercent = (
                  (margin / product.costPrice) *
                  100
                ).toFixed(0);
                const lowStock = getLowStockAlert(product);

                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      <div className="flex items-start gap-2">
                        <div>
                          <p>{product.name}</p>
                          {lowStock && (
                            <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                              <AlertTriangle className="w-3 h-3" />
                              Low stock
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ₹{product.sellingPrice}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          lowStock
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.currentStock}/{product.initialStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.totalSold}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className="text-green-600 font-medium">
                        {marginPercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
