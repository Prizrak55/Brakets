import styled from "styled-components";
import Radactor from "../components/RedactorTournament/Radactor";

const Conteiner = styled.div`
  padding: 8px;
  margin: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RedactorTournament = () => {
  return (
    <Conteiner>
      <Wrapper>
        <Radactor />
      </Wrapper>
    </Conteiner>
  );
};

export default RedactorTournament;
