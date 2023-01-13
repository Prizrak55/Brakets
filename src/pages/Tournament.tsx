import styled from "styled-components";
import StatsTournament from "../components/Tournament/StatsTournament";

const Conteiner = styled.div`
  padding: 8px;
  margin: 8px;
`;

const Tournament = () => {
  return (
    <Conteiner>
      <StatsTournament />
    </Conteiner>
  );
};

export default Tournament;
