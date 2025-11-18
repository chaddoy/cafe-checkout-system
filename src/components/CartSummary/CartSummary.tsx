import type { CartSummaryProps } from './types';

const CartSummary = ({
  items,
  subtotal,
  serviceCharge,
  total,
  serviceChargeRate,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  receipt,
}: CartSummaryProps) => {
  const percentageLabel = `${(serviceChargeRate * 100).toFixed(0)}%`;
  const hasItems = items.length > 0;
  const formattedTimestamp = receipt
    ? new Date(receipt.timestamp).toLocaleString()
    : null;

  return (
    <aside className="border rounded-lg p-4 w-full lg:w-80 bg-white shadow-sm h-fit">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      {!hasItems ? (
        <p className="text-sm text-gray-500">
          No items yet. Add something tasty!
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 border-b pb-2 last:border-b-0"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.size && (
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Size: {item.size}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    ${item.unitPrice.toFixed(2)} each
                  </p>
                </div>
                <button
                  type="button"
                  className="text-xs text-red-500 underline"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 border rounded"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  type="button"
                  className="px-2 py-1 border rounded"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <span className="ml-auto font-semibold">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service charge ({percentageLabel})</span>
          <span>${serviceCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-md disabled:bg-gray-300 disabled:text-gray-600"
        onClick={onCheckout}
        disabled={!hasItems}
      >
        Checkout
      </button>

      {receipt && (
        <div className="mt-6 border-t pt-4 text-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold">Latest receipt</h3>
            <span className="text-xs text-gray-500">{formattedTimestamp}</span>
          </div>
          <ul className="space-y-1">
            {receipt.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name}
                  {item.size ? ` (${item.size})` : ''} × {item.quantity}
                </span>
                <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-3 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service charge ({percentageLabel})</span>
              <span>${receipt.serviceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${receipt.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default CartSummary;
