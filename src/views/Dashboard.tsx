import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Navbar } from "../components/Navbar";

const NetWorthCard = styled.div`
  background-color: ${(props) => props.theme.secondary}
  width: 500px;
`;

function Dashboard() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Navbar />
      <div>
        <NetWorthCard />
      </div>
    </>
  );
}

export default Dashboard;
