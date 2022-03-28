import React, { useState, useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { GameContext } from "../../../GameContext";
import { setToken, setUser as setStoreUser } from "../../../store";

export const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

const emptyUser = {
  username: "",
  token: "",
};

const emptyValidator = {
  username: true,
  token: true,
};

const useSessionManagement = () => {
  const api = useContext(GameContext);
  const [user, setUser] = useState(emptyUser);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Derived state
  const validator = validateForm(user);

  const handleSignin = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (validator.username && validator.token) {
      try {
        await api.setCredentials(user.username, user.token);

        const returningUser = await api.getUser();

        localStorage.setItem(
          "apiKey",
          JSON.stringify({ username: user.username, token: user.token })
        );
        dispatch(setToken({ username: user.username, token: user.token }));
        dispatch(setStoreUser(returningUser));
        setStatus(STATUS.COMPLETED);
      } catch (err: unknown) {
        setStatus(STATUS.IDLE);
        setError((err as Error).message);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      setUser((currUser) => {
        return {
          ...currUser,
          [event.target.id]: event.target.value,
        };
      });
    },
    [setUser]
  );

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (validator.username) {
      try {
        console.log(user.username);
        const token = await api.getToken(user.username);
        localStorage.setItem(
          "apiKey",
          JSON.stringify({
            username: token.user.username,
            token: token.token,
          })
        );
        dispatch(
          setToken({ username: token.user.username, token: token.token })
        );
        await api.setCredentials(user.username, token.token);
        const newUser = await api.getUser();
        dispatch(setStoreUser(newUser));
        setStatus(STATUS.COMPLETED);
      } catch (err: unknown) {
        setStatus(STATUS.IDLE);
        setError((err as Error).message);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  };

  function validateForm(user: typeof emptyUser) {
    const errors = emptyValidator;

    errors.username = !!user.username;
    errors.token = !!user.token;

    return errors;
  }

  return {
    user,
    status,
    validator,
    error,
    handleChange,
    handleSignin,
    handleSignup,
  };
};

export default useSessionManagement;
