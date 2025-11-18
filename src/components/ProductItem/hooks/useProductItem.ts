import { useMemo, useState } from 'react';
import type { Product } from '../../../types';
import { useAppDispatch } from '../../../store';
import { addToCart } from '../../../store/slices/cart.slice';
import { isDrink, getSizedPrice } from '../../../utils/products';
import { DEFAULT_DRINK_SIZE } from '../../../utils/products';
import type { DrinkSize } from '../../../types';

const useProductItem = (product: Product) => {
  const { price } = product;
  const dispatch = useAppDispatch();
  const drink = isDrink(product);
  const [selectedSize, setSelectedSize] =
    useState<DrinkSize>(DEFAULT_DRINK_SIZE);

  const displayPrice = useMemo(() => {
    return drink ? getSizedPrice(product, selectedSize) : price;
  }, [drink, product, selectedSize, price]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        size: drink ? selectedSize : null,
      }),
    );
  };

  return {
    selectedSize,
    setSelectedSize,
    displayPrice,
    handleAddToCart,
  };
};

export default useProductItem;
