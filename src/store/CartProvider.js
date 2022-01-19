import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount = state.totalAmount + action.value.price * action.value.amount;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.value.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.value.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "REMOVE_ITEM") {
    const id = action.value;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === id;
    });
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      //if item exists
      const updatedTotalAmount = state.totalAmount - existingCartItem.price; //reduce the total price
      const updatedItems = [...state.items]; //copy current cart items

      if (existingCartItem.amount > 1) {
        updatedItems[existingCartItemIndex].amount--;
      } else {
        updatedItems.splice(existingCartItemIndex, 1);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    } else {
      return state;
    }
  } else return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", value: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", value: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
