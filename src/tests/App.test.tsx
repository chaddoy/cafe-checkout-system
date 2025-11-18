import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';
import type { Product } from '../types';
import { setProducts } from '../store/slices/product.slice';

const mockProducts: Product[] = [
  { id: 1, name: 'Latte', price: 4, category: 'Beverage', photo: 'latte.jpg' },
  { id: 2, name: 'Croissant', price: 3.5, category: 'Pastry', photo: 'c.jpg' },
];

describe('App integration', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockProducts),
    } as Response);
    store.dispatch(setProducts([]));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads products and renders them', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(
      await screen.findByRole('heading', { name: /Cafe Checkout System/i }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Latte')).toBeInTheDocument();
      expect(screen.getByText('Croissant')).toBeInTheDocument();
    });
  });
});
