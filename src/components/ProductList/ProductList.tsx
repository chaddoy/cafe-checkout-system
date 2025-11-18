import type { Product } from '../../types';
import { ProductItem } from '../ProductItem';

const ProductList = ({ products }: { products: Product[] }) => {
  if (!products.length) {
    return (
      <p className="text-center text-gray-500">
        No products match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
      {products.map((product) => (
        <ProductItem key={`${product.id}-${product.name}`} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
