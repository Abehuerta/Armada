/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Api, ApiType } from "./Api";
import { setToken } from "./store";

export const GameContext = createContext<Api>(undefined as unknown as Api);

interface Token {
  username: string;
  token: string;
}

export const GameProvider: React.FC = function GameProvider({ children }) {
  const [api, setApi] = useState<Api>();
  const dispatch = useDispatch();
  const apiKey = localStorage.getItem("apiKey")
    ? (JSON.parse(localStorage.getItem("apiKey") as string) as Token)
    : null;

  useEffect(() => {
    if (apiKey) {
      dispatch(setToken(apiKey));
      setApi(new Api(apiKey.username, apiKey.token));
    } else {
      setApi(new Api());
    }
  }, []);

  return (
    <GameContext.Provider value={api as Api}>
      {!!api && children}
    </GameContext.Provider>
  );
};
