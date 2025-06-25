'use client';
import { Product } from '@/types';
import { useCart } from '@/store/cart';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <Link href={`/products/${product.id}`}>
        {product.image_url && (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-700">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{product.description}</p>
        </div>
      </Link>
      <button 
        onClick={() => addItem(product)}
        className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
