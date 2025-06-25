import { supabase } from '@/lib/supabaseClient';
import OrderItem from '@/components/OrderItem';
import { Order } from '@/types';

export default async function OrdersPage() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please login to view your orders</p>
      </div>
    );
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      
      {orders?.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders?.map((order: Order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
