import styled from "styled-components";
import AllTourtaments from "../components/Brackets/AllTourtaments";
import Filter from "../components/Brackets/Filter";

const Conteiner = styled.div`
  padding: 16px;
  display: flex;
`;
const WrapperFilterBar = styled.div`
  display: flex;
  width: 500px;
`;

const Brackets = () => {
  return (
    <>
      <WrapperFilterBar>
        <Filter />
      </WrapperFilterBar>
      <Conteiner>
        <AllTourtaments />
      </Conteiner>
    </>
  );
};

export default Brackets;
