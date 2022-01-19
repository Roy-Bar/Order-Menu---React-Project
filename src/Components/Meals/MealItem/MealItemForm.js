import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);  
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = +inputRef.current.value;
    
    if (enteredAmount && enteredAmount >= 1 && enteredAmount <= 5) {
      setIsAmountValid(true);
      props.onAddToCart(enteredAmount);
    } else {
      setIsAmountValid(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{ id: props.id, type: "number", min: "1", max: "5", step: "1", defaultValue: "1" }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please choose a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
