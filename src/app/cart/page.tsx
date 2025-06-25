'use client';
import { useCart } from '@/store/cart';
import CartItem from '@/components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/products" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onRemove={() => removeItem(item.id)}
                onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
              />
            ))}
          </div>
          
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="mt-6">
              <Link 
                href="/checkout"
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
