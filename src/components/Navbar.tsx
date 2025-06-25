'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';

export default function Navbar() {
  const router = useRouter();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">E-Commerce</Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/products">Products</Link>
          <Link href="/cart" className="flex items-center">
            Cart 
            {itemCount > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/orders">Orders</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
