export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Order = {
  id: string;
  user_id: string;
  products: CartItem[];
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped';
  created_at: string;
};
