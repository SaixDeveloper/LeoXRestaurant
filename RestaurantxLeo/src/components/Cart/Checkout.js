import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    number: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const numberInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredNumberIsValid = isTenChars(enteredNumber);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      number: enteredNumberIsValid,
      city: enteredCityIsValid,
    });
    const formIsvalid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredNumberIsValid &&
      enteredCityIsValid;

    if (!formIsvalid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      number: enteredNumber,
      street:enteredStreet,
      city:enteredCity,
     })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputsValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a valid Name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a valid Street name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.number && classes.invalid
        }`}
      >
        <label htmlFor="postal">Number</label>
        <input type="text" id="postal" ref={numberInputRef} />
        {!formInputsValidity.number && <p>Please Enter a valid Number!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
