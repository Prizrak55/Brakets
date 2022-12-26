import { useDispatch } from "react-redux";
import styled from "styled-components";
// import AllTourtaments from "../components/Brackets/AllTourtaments";
import { Input } from "../components/Layouts/UI/Input";
import { changeFilterNameName } from "../store/reducers/filterSlice";

const Conteiner = styled.div`
  padding: 16px;
  display: flex;
`;

const Brackets = () => {
  const dispatch = useDispatch();
  const filterName = (value: string) => {
    dispatch(changeFilterNameName(value));
  };
  return (
    <>
      <Input
        onChange={(e) => filterName(e.target.value)}
        width={"200px"}
        placeholder="поиск"
      />
      <Conteiner>{/* <AllTourtaments /> */}</Conteiner>
    </>
  );
};

export default Brackets;
