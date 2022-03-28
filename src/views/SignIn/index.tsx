import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "../../components/Button/StyledButton";
import HyperText from "../../components/Hypertext";
import Box from "../../components/Box";
import SignInForm from "./components/SignInForm";
import { STATUS } from "./hooks/useSessionManagement";
import SignupForm from "./components/SignupForm";

const PageWrapper = styled.div`
  background-color: #1a1a40;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
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
        <div>
          {isSignIn ? (
            <div>
              <SignInForm />
              <p>
                Need an account?{" "}
                <StyledButton onClick={toggleSignIn}>Sign Up</StyledButton>
              </p>
            </div>
          ) : (
            <div>
              <SignupForm />
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
