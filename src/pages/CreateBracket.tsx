import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  width: 50px;
`;

const CreateBrackets = () => {
  const count = useSelector((state: any) => state.tournament);
  console.log(count);
  const dispatch = useDispatch();

  return (
    <>
      <Container>Страница создания турнира</Container>
    </>
  );
};

export default CreateBrackets;
