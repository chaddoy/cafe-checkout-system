import { useMemo, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import type { Product } from '../types';
import { fuzzyIncludes } from '../utils/products';
import { useAppDispatch } from '../store';
import { setSearchQuery } from '../store/slices/product.slice';

type UseSearchProps = {
  dedupedProducts: Product[];
  searchQuery: string;
};

const useSearch = ({ dedupedProducts, searchQuery }: UseSearchProps) => {
  const dispatch = useAppDispatch();

  const searchedProducts = useMemo(() => {
    if (!searchQuery) {
      return dedupedProducts;
    }
    return dedupedProducts.filter((product) =>
      fuzzyIncludes(
        `${product.name} ${product.category} ${product.price}`,
        searchQuery,
      ),
    );
  }, [dedupedProducts, searchQuery]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(event.target.value));
    },
    [dispatch],
  );

  return {
    searchedProducts,
    handleSearchChange,
  };
};

export default useSearch;
