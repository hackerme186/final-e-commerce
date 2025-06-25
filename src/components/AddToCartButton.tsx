'use client';
import { Product } from '@/types/index';
import { useCart } from '@/store/cart';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button 
      onClick={() => addItem(product)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
}
