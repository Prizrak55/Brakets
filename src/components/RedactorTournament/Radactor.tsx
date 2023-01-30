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
import { checkObjNull } from "../../utils/checkObjNull";

const Title = styled.h1`
  font-size: 16px;
  margin: 10px;
`;
const Redactor = () => {
  const [redactorTournament, setRedactorTournament] = useState<any>();

  const { tournament, tournaments } = useAppSelector(
    ({ tournament }) => tournament
  );
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getOneTournament(id));
  }, [dispatch, id]);

  useEffect(() => {
    setRedactorTournament(tournament);
  }, [tournament]);

  const changeName = (e: { target: { value: string } }) => {
    tournament &&
      setRedactorTournament({ ...redactorTournament, name: e.target.value });
  };

  const changeStatus = (value: string) => {
    if (value) {
      const newStatus: number =
        value === "активен"
          ? StatusTournament.Active
          : StatusTournament.Inactive;
      tournament &&
        setRedactorTournament({ ...redactorTournament, status: newStatus });
    }
  };

  const saveChange = () => {
    const checkName = tournaments
      .filter((tournament) => tournament.id !== redactorTournament.id)
      .every(
        (tournamentName) => tournamentName.name !== redactorTournament.name
      );
    if (checkObjNull(redactorTournament)) {
      alert("заполните все поля");
      return;
    }
    if (!checkName) {
      alert("Имя турнира уже существует");
    }
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
            onChange={(e) => changeName(e)}
          />
          <Select handleChange={changeStatus} data={status} />
          <Button onClick={saveChange} text="Сохранить" />
        </>
      )}
    </>
  );
};

const status = ["не активен", "активен"];

export default Redactor;
