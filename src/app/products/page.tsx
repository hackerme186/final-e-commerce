import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabaseClient';

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
