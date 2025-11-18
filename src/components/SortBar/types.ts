import type { Product, SortBy } from '../../types';

export type SortBarProps = {
  products: Product[];
  sortOptions: SortOption[];
  sortBy: SortBy | null;
  setSortBy: (sortBy: SortBy | null) => void;
};

export type SortOption = {
  label: string;
  value: Exclude<SortBy, null>;
};
