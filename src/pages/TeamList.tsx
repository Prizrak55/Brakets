import React from "react";
import styled from "styled-components";
import AllTeams from "../components/TeamList/AllTeams";

const Conteiner = styled.div`
  padding: 16px;
  display: flex;
`;

const TeamList = () => {
  return (
    <Conteiner>
      <AllTeams />
    </Conteiner>
  );
};

export default TeamList;
