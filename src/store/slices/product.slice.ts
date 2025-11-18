import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {Product, SortBy} from '../../types';
import type { ProductState } from './types';

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: null,
};

export const fetchProductsThunk = createAsyncThunk(
  'product/fetchProducts',
  async (): Promise<Product[]> => {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | Error | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message ?? 'Failed to fetch products';
    });
  },
});

export const { setProducts, setLoading, setError, setSearchQuery, setSortBy } = productSlice.actions;

export default productSlice.reducer;
