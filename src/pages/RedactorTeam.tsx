import React from "react";
import styled from "styled-components";
import Redactor from "../components/RedactorTeam/Redactor";

const Conteiner = styled.div`
  padding: 8px;
  margin: 8px;
`;

const RedactorTeam = () => {
  return (
    <Conteiner>
      <Redactor />
    </Conteiner>
  );
};

export default RedactorTeam;
