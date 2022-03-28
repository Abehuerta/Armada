import React from "react";
import Input from "./Input";
import StyledButton from "../../../components/Button/StyledButton";
import useSessionManagement, { STATUS } from "../hooks/useSessionManagement";

const SignInForm = () => {
  const { user, status, validator, error, handleChange, handleSignin } =
    useSessionManagement();

  return (
    <>
      {(!validator.username || !validator.token) &&
        status === STATUS.SUBMITTED && (
          <div>
            <p style={{ color: "red" }}>Please fix errors</p>
          </div>
        )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div>
          <Input
            type='text'
            placeholder='Username'
            id='username'
            value={user.username}
            onChange={handleChange}
            isValid={validator.username || status !== STATUS.SUBMITTED}
            required
          />
        </div>

        <div>
          <Input
            type='text'
            placeholder='Token'
            id='token'
            value={user.token}
            onChange={handleChange}
            isValid={validator.token || status !== STATUS.SUBMITTED}
            required
          />
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
    </>
  );
};

export default SignInForm;
