import { useEffect, useState } from "react";
import styled from "styled-components";
import AllTourtaments from "../components/Brackets/AllTourtaments";
import { Input } from "../Layouts/UI/Input";
import { Select } from "../Layouts/UI/Select";
import useDebounce from "../Service/Debounce";
import { useAppDispatch } from "../store";
import {
  changeFilterName,
  changeFilterType,
} from "../store/reducers/filterSlice";
import { TypeTournament } from "../store/reducers/tournamentSlice";

const Conteiner = styled.div`
  padding: 16px;
  display: flex;
`;
const WrapperFilterBar = styled.div`
  display: flex;
  width: 500px;
`;

const Brackets = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();

  const filterName = useDebounce(filter, 500);

  const changeFilter = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    dispatch(changeFilterName(filterName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  const changeType = (value: TypeTournament) => {
    dispatch(changeFilterType(value));
  };

  return (
    <>
      <WrapperFilterBar>
        <Input
          onChange={(e) => changeFilter(e.target.value)}
          width={"200px"}
          placeholder="поиск"
        />
        <Select change={changeType} data={TypeTournaments} />
      </WrapperFilterBar>
      <Conteiner>
        <AllTourtaments />
      </Conteiner>
    </>
  );
};

const TypeTournaments = [
  "",
  "singleElimination",
  "doubleElimination",
  "roundRobin",
  "groupState",
];

export default Brackets;
