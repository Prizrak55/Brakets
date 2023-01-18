import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../Layouts/UI/Button";
import { Input } from "../../Layouts/UI/Input";
import { Select } from "../../Layouts/UI/Select";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getOneTournament,
  StatusTournament,
  updateOneTournament,
} from "../../store/reducers/tournamentSlice";

const Title = styled.h1`
  font-size: 16px;
  margin: 10px;
`;
const Redactor = () => {
  const [redactorTournament, setRedactorTournament] = useState<any>();
  const [status] = useState(["не активен", "активен"]);
  const { tournament } = useAppSelector(({ tournament }) => tournament);
  console.log(tournament);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getOneTournament(id));
  }, [dispatch, id]);

  useEffect(() => {
    setRedactorTournament(tournament);
  }, [tournament]);

  const changeName = (e: { target: { value: string } }, name: string) => {
    if (name === "status") {
      const newStatus: number =
        e.target.value === "активен"
          ? StatusTournament.Active
          : StatusTournament.Inactive;
      tournament &&
        setRedactorTournament({ ...redactorTournament, status: newStatus });
      return;
    }

    tournament &&
      setRedactorTournament({ ...redactorTournament, [name]: e.target.value });
  };

  const saveChange = () => {
    dispatch(updateOneTournament(redactorTournament));
  };

  return (
    <>
      <Title>Редактирование турнира</Title>
      {redactorTournament && (
        <>
          <Input
            width="200px"
            placeholder="Название"
            value={redactorTournament.name}
            onChange={(e) => changeName(e, "name")}
          />
          <Select handleChange={(e) => changeName(e, "status")} data={status} />
          <Button onClick={saveChange} text="Сохранить" />
        </>
      )}
    </>
  );
};

export default Redactor;
