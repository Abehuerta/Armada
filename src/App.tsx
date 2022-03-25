import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useEffect } from "react";
import { RootState, setUser, reset } from "./store";
import { GameContext } from "./GameContext";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";

function App() {
  const { account } = useSelector((state: RootState) => state);
  const api = useContext(GameContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await api.getUser();
        dispatch(setUser(result));
      } catch (err) {
        if ((err as Error).message === "Invalid username or token.") {
          dispatch(reset());
          localStorage.removeItem("apiKey");
        }
      }
    };

    if (account.username && account.token) {
      fetchAccount();
    }
  }, []);

  return (
    <>
      {account.token === undefined ||
      account.token === null ||
      account.token.length === 0 ||
      account.username === undefined ||
      account.username === null ||
      account.username.length === 0 ? (
        <SignIn />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
