import type { DrinkSize, Product } from '../../types';
import { DRINK_SIZE_PRICE_MAP, isDrink } from '../../utils/products';
import useProductItem from './hooks/useProductItem';

const sizeOptions: DrinkSize[] = ['Small', 'Medium', 'Large'];

const ProductItem = (product: Product) => {
  const { name, category, photo } = product;
  const { selectedSize, setSelectedSize, displayPrice, handleAddToCart } =
    useProductItem(product);

  return (
    <div className="border p-4 rounded-lg max-w-sm text-center shadow-sm w-full flex flex-col justify-between">
      <div className="max-w-sm text-center">
        <img
          src={photo}
          alt={name}
          className="w-40 h-40 object-cover mx-auto rounded-md"
        />
        <div className="mt-4">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {category}
          </p>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-xl font-bold text-green-600">
            ${displayPrice.toFixed(2)}
          </p>
        </div>

        {isDrink(product) && (
          <div className="mt-4">
            <p className="block text-sm font-medium mb-2">Size</p>
            <div
              className="flex flex-wrap gap-2 justify-center"
              role="group"
              aria-label="Select size"
            >
              {sizeOptions.map((size) => {
                const adjustment = DRINK_SIZE_PRICE_MAP[size];
                const label =
                  adjustment === 0
                    ? `${size} (base)`
                    : `${size} (${adjustment > 0 ? '+' : ''}$${Math.abs(
                        adjustment,
                      ).toFixed(2)})`;
                const isActive = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-sm ${
                      isActive
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded-md mt-5 w-full"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
