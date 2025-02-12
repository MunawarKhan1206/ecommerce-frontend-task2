import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">All Products</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
