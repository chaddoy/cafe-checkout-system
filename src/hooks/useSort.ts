import { useMemo, useCallback } from 'react';
import type { Product, SortBy } from '../types';
import { sortOptions } from '../utils/products';
import { useAppDispatch } from '../store';
import { setSortBy } from '../store/slices/product.slice';

type UseSortProps = {
  searchedProducts: Product[];
  sortBy: SortBy;
};

const useSort = ({ searchedProducts, sortBy }: UseSortProps) => {
  const dispatch = useAppDispatch();

  const sortedProducts = useMemo(() => {
    if (!sortBy) return searchedProducts;
    const list = [...searchedProducts];

    switch (sortBy) {
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      case 'name':
      case 'category':
        return list.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      default:
        return searchedProducts;
    }
  }, [searchedProducts, sortBy]);

  const handleSortChange = useCallback(
    (value: SortBy) => {
      dispatch(setSortBy(value));
    },
    [dispatch],
  );
  return {
    sortedProducts,
    sortOptions,
    sortBy,
    handleSortChange,
  };
};

export default useSort;
