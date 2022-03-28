import React from "react";
import Input from "./Input";
import StyledButton from "../../../components/Button/StyledButton";
import useSessionManagement, { STATUS } from "../hooks/useSessionManagement";

const SignupForm = () => {
  const { user, status, validator, handleChange, handleSignup } =
    useSessionManagement();

  return (
    <>
      {!validator.username && status === STATUS.SUBMITTED && (
        <div>
          <p style={{ color: "red" }}>Please fix errors</p>
        </div>
      )}
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
          <StyledButton
            type='submit'
            disabled={status === STATUS.SUBMITTING}
            onClick={handleSignup}>
            Sign up
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
