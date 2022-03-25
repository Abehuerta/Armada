import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GameProvider } from "./GameContext";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GameProvider>
          <GlobalStyles />
          <App />
        </GameProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
