import { useState } from "react";
import styled from "styled-components";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";
import { Select } from "./UI/Select";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import {
  StatusTournament,
  TournamentsState,
  TypeTournament,
} from "../../store/reducers/tournamentSlice";

const Conteiner = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--colors-bg);
  padding: 12px;
  border-radius: var(--radii);
  width: 400px;
  box-shadow: var(--shadow);
`;

const ModalBracket = () => {
  const [name, setName] = useState("");
  const [typeBracket, setTypeBracket] = useState<String>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeName = (value: string) => {
    setName(value);
  };
  const changeType = (value: string) => {
    setTypeBracket(value);
  };
  const createBracket = () => {
    if (name === "" && typeBracket === "" && typeBracket !== "Тип турнира") {
      alert("Заполните форму");
      return "";
    }
    const data: TournamentsState = {
      id: uuid(),
      name: name,
      status: StatusTournament.inactive,
      createAt: new Date(),
      type: TypeTournament.singleElimination,
      comands: [],
    };

    navigate("/create-bracket");
  };

  return (
    <Conteiner onClick={(e) => e.stopPropagation()}>
      <Wrapper>
        <Input
          type={"text"}
          value={name}
          onChange={(e) => changeName(e.target.value)}
          placeholder="Название"
        />
        <Select change={changeType} data={["Тип турнира", "сингл", "Дабл"]} />
        <Button
          onClick={createBracket}
          margin="10px 0 10px 0"
          width={"200px"}
          text="Создать турнир"
        />
      </Wrapper>
    </Conteiner>
  );
};

export default ModalBracket;
