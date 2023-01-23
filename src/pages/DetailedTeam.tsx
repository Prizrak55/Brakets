import React from "react";
import styled from "styled-components";
import StatsTeam from "../components/DetailedTeam/StatsTeam";

const Conteiner = styled.div`
  padding: 8px;
  margin: 8px;
`;

const DetailedTeam = () => {
  return (
    <Conteiner>
      <StatsTeam />
    </Conteiner>
  );
};

export default DetailedTeam;
