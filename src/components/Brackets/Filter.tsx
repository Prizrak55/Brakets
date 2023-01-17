import React, { useEffect, useState } from "react";
import { Input } from "../../Layouts/UI/Input";
import { Select } from "../../Layouts/UI/Select";
import useDebounce from "../../Service/Debounce";
import { useAppDispatch } from "../../store";
import {
  changeFilterName,
  changeFilterType,
} from "../../store/reducers/filterSlice";
import { TypeTournament } from "../../store/reducers/tournamentSlice";

const Filter = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();

  const filterName = useDebounce(filter, 500);

  const changeFilter = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    dispatch(changeFilterName(filterName));
  }, [filterName, dispatch]);

  const changeType = (value: TypeTournament) => {
    dispatch(changeFilterType(value));
  };

  return (
    <>
      <Input
        onChange={(e) => changeFilter(e.target.value)}
        width={"200px"}
        placeholder="поиск"
      />
      <Select handleChange={changeType} data={TypeTournaments} />
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
export default Filter;
