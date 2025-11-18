import { describe, expect, it } from 'vitest';
import {
  DRINK_SIZE_PRICE_MAP,
  dedupeProducts,
  fuzzyIncludes,
  getSizedPrice,
  isDrink,
} from '../../utils/products';
import type { Product } from '../../types';

const drink: Product = {
  id: 1,
  name: 'Latte',
  price: 4,
  category: 'Beverage',
  photo: 'latte.jpg',
};

const pastry: Product = {
  id: 2,
  name: 'Croissant',
  price: 3.5,
  category: 'Pastry',
  photo: 'c.jpg',
};

describe('utils/products', () => {
  it('adjusts drink pricing by size', () => {
    expect(getSizedPrice(drink, 'Large')).toBe(4 + DRINK_SIZE_PRICE_MAP.Large);
    expect(getSizedPrice(drink, 'Small')).toBe(4 + DRINK_SIZE_PRICE_MAP.Small);
    expect(getSizedPrice(pastry, 'Large')).toBe(pastry.price);
  });

  it('identifies drinks', () => {
    expect(isDrink(drink)).toBe(true);
    expect(isDrink(pastry)).toBe(false);
  });

  it('deduplicates by name, price, and category', () => {
    const duplicates = [
      drink,
      { ...drink, id: 99 },
      pastry,
      { ...pastry, id: 100, category: 'Pastry' },
    ];

    const deduped = dedupeProducts(duplicates);
    expect(deduped).toHaveLength(2);
  });

  it('performs fuzzy includes', () => {
    expect(fuzzyIncludes('Caramel Latte', 'clt')).toBe(true);
    expect(fuzzyIncludes('Croissant', 'xyz')).toBe(false);
    expect(fuzzyIncludes('Any text', '')).toBe(true);
  });
});

