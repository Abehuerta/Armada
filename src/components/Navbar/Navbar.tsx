import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, reset } from "../../store";
import StyledButton from "../Button/StyledButton";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const logout = () => {
    dispatch(reset());
    localStorage.removeItem("apiKey");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "slateblue",
      }}>
      <div>
        Signed in as{" "}
        {user.username === undefined ? (
          <span>nobody </span>
        ) : (
          <span>{user.username} </span>
        )}
        <StyledButton onClick={logout}>Sign out</StyledButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>Fleet</div>
        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>Systems</div>
        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          Market Place
        </div>
      </div>
    </div>
  );
};

export default Navbar;
