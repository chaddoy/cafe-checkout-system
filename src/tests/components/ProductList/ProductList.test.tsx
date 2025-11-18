import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductList from '../../../components/ProductList/ProductList';
import type { Product } from '../../../types';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import type { ReactElement } from 'react';

const renderWithProvider = (ui: ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Latte',
    price: 4,
    category: 'Beverage',
    photo: 'latte.jpg',
  },
  {
    id: 2,
    name: 'Croissant',
    price: 3.5,
    category: 'Pastry',
    photo: 'croissant.jpg',
  },
];

describe('ProductList', () => {
  it('shows empty state when no products are provided', () => {
    renderWithProvider(<ProductList products={[]} />);

    expect(
      screen.getByText(/No products match your filters/),
    ).toBeInTheDocument();
  });

  it('renders each product item', () => {
    renderWithProvider(<ProductList products={sampleProducts} />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      sampleProducts.length,
    );
    sampleProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
