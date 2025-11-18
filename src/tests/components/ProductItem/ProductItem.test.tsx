import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ProductItem from '../../../components/ProductItem/ProductItem';
import type { Product } from '../../../types';
import useProductItem from '../../../components/ProductItem/hooks/useProductItem';

vi.mock('../../../components/ProductItem/hooks/useProductItem', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const useProductItemMock = useProductItem as unknown as ReturnType<
  typeof vi.fn
>;

const drinkProduct: Product = {
  id: 1,
  name: 'Iced Latte',
  price: 4,
  category: 'Beverage',
  photo: 'latte.jpg',
};

const pastryProduct: Product = {
  id: 2,
  name: 'Croissant',
  price: 3.5,
  category: 'Pastry',
  photo: 'croissant.jpg',
};

describe('ProductItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders drink controls and responds to interactions', async () => {
    const setSelectedSize = vi.fn();
    const handleAddToCart = vi.fn();

    useProductItemMock.mockReturnValue({
      selectedSize: 'Medium',
      setSelectedSize,
      displayPrice: 4.5,
      handleAddToCart,
    });

    render(<ProductItem {...drinkProduct} />);

    expect(screen.getByText('Iced Latte')).toBeInTheDocument();
    expect(screen.getByText('$4.50')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();

    const largeButton = screen.getByRole('button', {
      name: /Large \(\+\$0\.50\)/,
    });
    await userEvent.click(largeButton);
    expect(setSelectedSize).toHaveBeenCalledWith('Large');

    const addButton = screen.getByRole('button', { name: /Add to Cart/i });
    await userEvent.click(addButton);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  it('hides size selector for non-drink products', () => {
    useProductItemMock.mockReturnValue({
      selectedSize: 'Medium',
      setSelectedSize: vi.fn(),
      displayPrice: pastryProduct.price,
      handleAddToCart: vi.fn(),
    });

    render(<ProductItem {...pastryProduct} />);

    expect(screen.queryByText('Size')).not.toBeInTheDocument();
  });
});
