import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../Layouts/UI/Button";
import { Input } from "../../Layouts/UI/Input";
import { Select } from "../../Layouts/UI/Select";
import { StatusTournament } from "../../store/reducers/tournamentSlice";

const Title = styled.h1`
  font-size: 16px;
  margin: 10px;
`;
const Redactor = () => {
  const [tournament, setTournament] = useState<any>({});
  const [status, setStatus] = useState(["не активен", "активен"]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/brackets/${params.id}`)
      .then((response) => {
        setTournament(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeName = (e: { target: { value: string } }) => {
    setTournament({ ...tournament, name: e.target.value });
  };

  const changeStatus = (value: string) => {
    const newStatus: number =
      value === "активен" ? StatusTournament.Active : StatusTournament.Inactive;
    setTournament({ ...tournament, status: newStatus });
  };

  const saveChange = () => {
    axios
      .put(`http://localhost:3000/brackets/${params.id}`, tournament)
      .then((response) => console.log(response.status))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Title>Редактирование турнира</Title>
      <Input
        width="200px"
        placeholder="Название"
        value={tournament.name}
        onChange={changeName}
      />
      <Select change={changeStatus} data={status} />
      <Button onClick={saveChange} text="Сохранить" />
    </>
  );
};

export default Redactor;
