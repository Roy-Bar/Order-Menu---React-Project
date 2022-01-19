import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBtnBumped, setIsBtnBumped] = useState(false);
  const numOfCartItems = cartCtx.items.reduce((prevValue, currItem) => {
    return prevValue + currItem.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isBtnBumped ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length > 0) {
      setIsBtnBumped(true);
      const timer = setTimeout(() => {
        setIsBtnBumped(false);
      }, 300);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
