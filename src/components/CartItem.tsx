import { CartItem } from '@/types/index';

export default function CartItem({ 
  item, 
  onRemove, 
  onUpdateQuantity 
}: { 
  item: CartItem, 
  onRemove: () => void, 
  onUpdateQuantity: (quantity: number) => void 
}) {
  return (
    <div className="flex items-center border-b pb-4">
      {item.image_url && (
        <img 
          src={item.image_url} 
          alt={item.name} 
          className="w-24 h-24 object-contain mr-4"
        />
      )}
      <div className="flex-1">
        <h3 className="font-bold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <label className="mr-2">Quantity:</label>
          <input 
            type="number" 
            min="1" 
            value={item.quantity} 
            onChange={(e) => onUpdateQuantity(parseInt(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={onRemove}
          className="mt-2 text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
