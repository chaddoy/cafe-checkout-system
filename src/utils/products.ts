import type { DrinkSize, Product } from '../types';
import type { SortOption } from '../components/SortBar/types';

export const sortOptions: SortOption[] = [
  { label: 'Name', value: 'name' },
  { label: 'Price', value: 'price' },
  { label: 'Category', value: 'category' },
];

export const DRINK_SIZE_PRICE_MAP: Record<DrinkSize, number> = {
  Small: -0.5,
  Medium: 0,
  Large: 0.5,
};

export const DEFAULT_DRINK_SIZE: DrinkSize = 'Medium';

export const getSizedPrice = (product: Product, size: DrinkSize) => {
  if (product.category.toLowerCase() !== 'beverage') {
    return product.price;
  }
  const adjustment = DRINK_SIZE_PRICE_MAP[size] ?? 0;
  return Number((product.price + adjustment).toFixed(2));
};

export const isDrink = (product: Product) =>
  product.category.toLowerCase() === 'beverage';

export const dedupeProducts = (items: Product[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.name}|${item.price}|${item.category}`.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const fuzzyIncludes = (text: string, query: string) => {
  if (!query) return true;
  let matchIndex = 0;
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  for (
    let i = 0;
    i < normalizedText.length && matchIndex < normalizedQuery.length;
    i += 1
  ) {
    if (normalizedText[i] === normalizedQuery[matchIndex]) {
      matchIndex += 1;
    }
  }

  return matchIndex === normalizedQuery.length;
};
