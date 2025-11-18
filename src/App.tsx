import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { fetchProductsThunk } from './store/slices/product.slice';
import ProductList from './components/ProductList/ProductList';
import { SortBar } from './components/SortBar';
import { CartSummary } from './components/CartSummary';
import { dedupeProducts, sortOptions } from './utils/products';
import useSort from './hooks/useSort';
import useSearch from './hooks/useSearch';
import Header from './components/Header/Header';
import useCart from './hooks/useCart';

const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.items);
  const searchQuery = useAppSelector((state) => state.product.searchQuery);
  const sortBy = useAppSelector((state) => state.product.sortBy);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const dedupedProducts = useMemo(() => dedupeProducts(products), [products]);
  const { searchedProducts, handleSearchChange } = useSearch({
    dedupedProducts,
    searchQuery,
  });

  const { sortedProducts, handleSortChange } = useSort({
    searchedProducts,
    sortBy,
  });

  const {
    cartItems,
    subtotal,
    serviceCharge,
    total,
    lastReceipt,
    serviceChargeRate,
    handleQuantityUpdate,
    handleRemoveItem,
    handleCheckout,
  } = useCart();

  return (
    <div className="p-4 space-y-6">
      <div className="mb-4">
        <Header
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <SortBar
          products={sortedProducts}
          sortOptions={sortOptions}
          sortBy={sortBy}
          setSortBy={handleSortChange}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <CartSummary
          items={cartItems}
          subtotal={subtotal}
          serviceCharge={serviceCharge}
          total={total}
          serviceChargeRate={serviceChargeRate}
          onUpdateQuantity={handleQuantityUpdate}
          onRemove={handleRemoveItem}
          onCheckout={handleCheckout}
          receipt={lastReceipt}
        />

        <div className="flex-1">
          <ProductList products={sortedProducts} />
        </div>
      </div>
    </div>
  );
};

export default App;
