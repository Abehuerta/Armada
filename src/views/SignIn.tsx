import React, { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setToken, setUser as setStoreUser } from "../store";
import { GameContext } from "../GameContext";
import StyledButton from "../components/Button/StyledButton";
import HyperText from "../components/Hypertext/Hypertext";
import Box from "../components/Box/Box";
import OrbitTest from "../svgs/OrbitTest.svg";

const PageWrapper = styled.div`
  background-color: #1a1a40;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const STATUS = {
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
  username: undefined as unknown as string,
  token: undefined as unknown as string,
};

const SignIn = () => {
  const api = useContext(GameContext);
  const [user, setUser] = useState(emptyUser);
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState(STATUS.IDLE);

  // Derived state
  const errorMessages = validateForm(user);
  const isValid = signIn ? user.username && user.token : user.username !== "";

  const handleSignup = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError("");
      setStatus(STATUS.SUBMITTING);
      if (isValid) {
        try {
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
          setError((err as Error).message);
          setStatus(STATUS.IDLE);
        }
      } else {
        setStatus(STATUS.SUBMITTED);
      }
    },
    [setStatus, setError]
  );

  const handleSignin = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError("");
      setStatus(STATUS.SUBMITTING);
      if (isValid) {
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
          setError((err as Error).message);
          setStatus(STATUS.IDLE);
        }
      } else {
        setStatus(STATUS.SUBMITTED);
      }
    },
    [setError, setStatus]
  );

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

  function validateForm(user: typeof emptyUser) {
    const errors = emptyValidator;

    if (!user.username) {
      errors.username = "Please enter a username";
    }
    if (!user.token) {
      errors.token = "Please enter a token";
    }

    return errors;
  }

  const toggleSignIn = () => {
    setUser(emptyUser);
    setStatus(STATUS.IDLE);
    setError("");
    setSignIn(!signIn);
  };

  return (
    <PageWrapper>
      <Box>
        <h1
          style={{
            padding: "1rem",
            alignSelf: "center",
            fontSize: "50px",
          }}>
          ARMADA
        </h1>
        <p style={{ marginBottom: "1rem" }}>
          🚀 powered by{" "}
          <span>
            <HyperText href='https://spacetraders.io/'>
              Spacetraders API
            </HyperText>
          </span>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isValid && status === STATUS.SUBMITTED && (
          <div>
            <p style={{ color: "red" }}>Please fix errors</p>
          </div>
        )}
        <div>
          {signIn ? (
            <div>
              <form>
                <div>
                  <input
                    type='text'
                    placeholder='Username'
                    id='username'
                    value={user.username}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                    required
                  />
                  {!user.username && status === STATUS.SUBMITTED && (
                    <span style={{ color: "red" }}>
                      {" "}
                      Please enter a username
                    </span>
                  )}
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='Token'
                    id='token'
                    value={user.token}
                    onChange={handleChange}
                  />
                  {!user.token && status === STATUS.SUBMITTED && (
                    <span style={{ color: "red" }}> Please enter a token</span>
                  )}
                </div>
                <div>
                  <StyledButton
                    type='submit'
                    disabled={status === STATUS.SUBMITTING}
                    onClick={handleSignin}>
                    Sign In
                  </StyledButton>
                </div>
              </form>
              <p>
                Need an account?{" "}
                <StyledButton onClick={toggleSignIn}>Sign Up</StyledButton>
              </p>
            </div>
          ) : (
            <div>
              <form>
                <input
                  type='text'
                  placeholder='Username'
                  id='username'
                  value={user.username}
                  onChange={handleChange}
                  required
                />
                {!user.username && status === STATUS.SUBMITTED && (
                  <span style={{ color: "red" }}> Please enter a username</span>
                )}
                <div>
                  <StyledButton
                    type='submit'
                    disabled={status === STATUS.SUBMITTING}
                    onClick={handleSignup}>
                    Sign Up
                  </StyledButton>
                </div>
              </form>
              <p>
                Already have an account?{" "}
                <StyledButton type='button' onClick={toggleSignIn}>
                  Sign In
                </StyledButton>
              </p>
            </div>
          )}
        </div>
      </Box>
      <div>
        {/* <object
          style={{
            position: "absolute",
            top: "30%",
            left: "-40%",
            overflow: "hidden",
          }}
          type='image/svg+xml'
          data={OrbitTest}>
          svg-animation
        </object> */}
      </div>
    </PageWrapper>
  );
};

export default SignIn;
