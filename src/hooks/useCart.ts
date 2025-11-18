import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  updateQuantity,
  removeFromCart,
  checkoutCart,
} from '../store/slices/cart.slice';
import { SERVICE_CHARGE_RATE } from '../utils/cart';

const useCart = () => {
  const dispatch = useAppDispatch();

  const { items: cartItems, subtotal, serviceCharge, total, lastReceipt } =
    useAppSelector((state) => state.cart);

  const handleQuantityUpdate = useCallback(
    (id: string, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch],
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  const handleCheckout = useCallback(() => {
    dispatch(checkoutCart());
  }, [dispatch]);

  return {
    cartItems,
    subtotal,
    serviceCharge,
    total,
    lastReceipt,
    serviceChargeRate: SERVICE_CHARGE_RATE,
    handleQuantityUpdate,
    handleRemoveItem,
    handleCheckout,
  };
};

export default useCart;
