import { Order } from '@/types/index';

export default function OrderItem({ order }: { order: Order }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Order #{order.id.slice(0, 8)}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
          order.status === 'paid' ? 'bg-blue-200 text-blue-800' :
          'bg-green-200 text-green-800'
        }`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
      <p className="font-bold">Total: ${order.total_amount.toFixed(2)}</p>
      
      <div className="mt-3">
        <h4 className="font-medium mb-1">Products:</h4>
        <ul className="list-disc pl-5">
          {order.products.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price.toFixed(2)} x {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
