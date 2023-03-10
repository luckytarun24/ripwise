import React, { useContext, useState } from "react";
import { UserContext } from "./Dashboard";

const AddExpense = () => {
  const { users, handleAddBalance } = useContext(UserContext);
  const [formFields, setFormFields] = useState({
    whoPay: "",
    expenseType: "",
    totalAmount: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  const [userWiseExpense, setUserWiseExpense] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const handleExpenseChange = (event) => {
    let amount = event.target.value;
    if (expenseType[2] === formFields.expenseType) {
      amount = ((formFields.totalAmount * event.target.value) / 100).toFixed(2);
    }
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
    setUserWiseExpense({
      ...userWiseExpense,
      [event.target.name]: amount,
    });
  };
  const handleChange = (event) => {
    if (event.target.name === "expenseType") {
      setFormFields({
        ...formFields,
        expenseType: event.target.value,
        totalAmount: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      });
      setUserWiseExpense({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      });
      return;
    }
    if (expenseType[0] === formFields.expenseType) {
      const sum = (event.target.value / 4).toFixed(2);
      setFormFields({
        ...formFields,
        1: sum,
        2: sum,
        3: sum,
        4: sum,
        [event.target.name]: event.target.value,
      });
      setUserWiseExpense({
        ...userWiseExpense,
        1: sum,
        2: sum,
        3: sum,
        4: sum,
      });
      return;
    }
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
  const expenseType = ["EQUAL", "EXACT", "PERCENT"];
  const isDisable =
    Object.values(userWiseExpense).reduce(
      (acc, expense) => acc + parseFloat(expense),
      0
    ) != formFields.totalAmount;
  return (
    <div className="add-expense">
      <label>Who pay</label>
      <select name={"whoPay"} value={formFields.whoPay} onChange={handleChange}>
        <option>Please choose one option</option>
        {users.map(({ name, id }) => {
          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        })}
      </select>
      <label>expenseType</label>
      <select
        name={"expenseType"}
        value={formFields.expenseType}
        onChange={handleChange}
      >
        <option>Please choose one option</option>
        {expenseType.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
      <label>Total Amount</label>
      <input
        type="number"
        name={"totalAmount"}
        value={formFields.totalAmount}
        onChange={handleChange}
      />
      <label>Total</label>
      {users.map(({ id, name }) =>
        id != formFields.whoPay ? (
          <div className="all-balance">
            <div className="username">{name}</div>
            <input
              name={id}
              type={"number"}
              value={formFields[id]}
              onChange={handleExpenseChange}
              disabled={expenseType[0] === formFields.expenseType}
            />
            <div className="balance">{userWiseExpense[id]}</div>
          </div>
        ) : (
          <></>
        )
      )}
      <button
        onClick={() => {
          console.log(
            formFields,
            formFields.totalAmount,
            userWiseExpense[formFields.whoPay]
          );
          handleAddBalance(
            {
              ...userWiseExpense,
              [parseInt(formFields.whoPay)]:
                userWiseExpense[formFields.whoPay] - formFields.totalAmount,
            },
            formFields.whoPay
          );
        }}
        disabled={isDisable}
      >
        Save
      </button>
    </div>
  );
};

export default AddExpense;
