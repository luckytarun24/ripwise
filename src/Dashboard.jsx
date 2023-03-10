import { createContext, useState } from "react";
import AddExpense from "./AddExpense";
const UserContext = createContext(null);
const Dashboard = () => {
  const users = [
    {
      id: 1,
      name: "rahul",
      email: "rahul@gmail.com",
      mobile: "8005565860",
    },
    {
      id: 2,
      name: "rohan",
      email: "rohan@gmail.com",
      mobile: "8115556866",
    },
    {
      id: 3,
      name: "prerna",
      email: "prerna@gmail.com",
      mobile: "4657575454",
    },
    {
      id: 4,
      name: "rishabh",
      email: "rishabh@gmail.com",
      mobile: "5678234678",
    },
  ];
  const [owesList, setOwesList] = useState({});
  const [isAddFormVissible, setAddFormVissible] = useState(false);
  const [balances, setBalances] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  const handleAddBalance = (response, whoPay) => {
    const owes = { ...owesList };
    setBalances(
      Object.keys(balances).reduce((acc, value) => {
        acc[value] = parseFloat(acc[value]) - parseFloat(response[value]);
        if (value != whoPay && response[value] != 0) {
          if (!(`${value} owes ${whoPay}` in owes)) {
            owes[`${value} owes ${whoPay}`] = 0;
          }
          owes[`${value} owes ${whoPay}`] += parseFloat(response[value]);
        }
        return acc;
      }, balances)
    );
    setOwesList(owes);
    console.log(owes);
    setAddFormVissible(false);
  };
  return (
    <UserContext.Provider value={{ users, handleAddBalance }}>
      <div className="dashborad">
        <div className="header">Ripwise</div>
        {users.map(({ name, id }) => (
          <div className="userlist">
            <div>{name}</div>
            <div>{" ---> "}</div>
            <div>{balances[id]}</div>
            <button>view profile</button>
          </div>
        ))}
        <button onClick={() => setAddFormVissible(!isAddFormVissible)}>
          Add Expense
        </button>
      </div>
      {isAddFormVissible && (
        <div className="overlay">
          <AddExpense />
        </div>
      )}
    </UserContext.Provider>
  );
};
export default Dashboard;
export { UserContext };
