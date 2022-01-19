import React, { useState } from "react";

import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [displayCart, setDisplayCart] = useState(false);

  const displayCartHandler = () => {
    setDisplayCart(true);
  };

  const hideCartHandler = () => {
    setDisplayCart(false);
  };

  return (
    <CartProvider>
      {displayCart && <Cart onClickCloseCart={hideCartHandler} />}
      <Header onClickCart={displayCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
