import { createSelector } from 'reselect';

const selectCart = state => state.cart;

// returns list of items in a cart form store
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// returns value of hidden or not from store
export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

// returns total number of items from store
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

// returns total price of items from a store
export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);