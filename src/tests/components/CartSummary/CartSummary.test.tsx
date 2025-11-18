import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CartSummary } from '../../../components/CartSummary';
import type { CartItem, Receipt } from '../../../types';

const mockItems: CartItem[] = [
  {
    id: 'latte-large',
    productId: 1,
    name: 'Latte',
    category: 'Beverage',
    size: 'Large',
    quantity: 2,
    unitPrice: 4.5,
    photo: 'latte.jpg',
  },
];

const baseProps = {
  items: mockItems,
  subtotal: 9,
  serviceCharge: 0.9,
  total: 9.9,
  serviceChargeRate: 0.1,
};

describe('CartSummary component', () => {
  it('renders totals and triggers callbacks', async () => {
    const onUpdateQuantity = vi.fn();
    const onRemove = vi.fn();
    const onCheckout = vi.fn();
    const receipt: Receipt = {
      id: 'receipt-1',
      timestamp: new Date('2025-01-01T12:00:00Z').toISOString(),
      items: mockItems,
      subtotal: 9,
      serviceCharge: 0.9,
      total: 9.9,
    };

    render(
      <CartSummary
        {...baseProps}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemove}
        onCheckout={onCheckout}
        receipt={receipt}
      />,
    );

    expect(screen.getAllByText('Subtotal')).toHaveLength(2);
    expect(screen.getAllByText('$9.00')).not.toHaveLength(0);
    expect(screen.getAllByText('Service charge (10%)')).toHaveLength(2);
    expect(screen.getAllByText('$0.90')).not.toHaveLength(0);
    expect(screen.getAllByText('$9.90')).not.toHaveLength(0);

    await userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(onUpdateQuantity).toHaveBeenCalledWith('latte-large', 3);

    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledWith('latte-large');

    await userEvent.click(screen.getByRole('button', { name: 'Checkout' }));
    expect(onCheckout).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/Latest receipt/)).toBeInTheDocument();
    expect(screen.getByText('Latte (Large) × 2')).toBeInTheDocument();
  });

  it('disables checkout and shows empty state when cart is empty', () => {
    render(
      <CartSummary
        {...baseProps}
        items={[]}
        subtotal={0}
        serviceCharge={0}
        total={0}
        onUpdateQuantity={vi.fn()}
        onRemove={vi.fn()}
        onCheckout={vi.fn()}
        receipt={null}
      />,
    );

    expect(
      screen.getByText('No items yet. Add something tasty!'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeDisabled();
  });
});
