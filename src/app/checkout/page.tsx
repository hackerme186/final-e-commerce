'use client';
import { useCart } from '@/store/cart';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert('You must be logged in to place an order');
      return;
    }

    const { error } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        products: items,
        total_amount: total,
        status: 'pending'
      }]);

    if (error) {
      alert('Failed to place order: ' + error.message);
    } else {
      clearCart();
      router.push('/orders');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        <ul className="mb-6">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
