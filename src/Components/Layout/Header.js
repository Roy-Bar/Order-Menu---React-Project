import React from "react";

import styles from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClickCart}/>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImage} alt="meals"/> {/*can also use url path instead*/}
      </div>
    </>
  );
};

export default Header;
