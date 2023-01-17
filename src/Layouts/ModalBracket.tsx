import { useState } from "react";
import styled from "styled-components";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";
import { Select } from "./UI/Select";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import {
  StatusTournament,
  Tournament,
  TypeTournament,
} from "../store/reducers/tournamentSlice";
import axios from "axios";
const CloseWrapper = styled.div`
  background-color: rgba(30, 30, 30, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

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

type IModalBracket = {
  close: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ModalBracket: React.FC<IModalBracket> = ({ close }) => {
  const [name, setName] = useState("");
  const [typeBracket, setTypeBracket] =
    useState<TypeTournament>("singleElimination");

  const navigate = useNavigate();

  const changeName = (value: string) => {
    setName(value);
  };
  const changeType = (value: TypeTournament) => {
    setTypeBracket(value);
  };
  const createBracket = async (e: any) => {
    if (name === "") {
      alert("Заполните форму");
      return "";
    }
    const data: Tournament = {
      id: uuid(),
      name: name,
      status: StatusTournament.Inactive,
      createAt: new Date(),
      type: typeBracket,
      comands: [],
    };

    await axios
      .post("http://localhost:3000/brackets", data)
      .then((response) => close(e))
      .catch((err) => console.log(err));

    navigate("/create-bracket");
  };

  return (
    <CloseWrapper onClick={(e) => close(e)}>
      <Conteiner onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <Input
            type={"text"}
            value={name}
            onChange={(e) => changeName(e.target.value)}
            placeholder="Название"
          />
          <Select handleChange={changeType} data={TypeTournaments} />

          <Button
            onClick={createBracket}
            margin="10px 0 10px 0"
            width={"200px"}
            text="Создать турнир"
          />
        </Wrapper>
      </Conteiner>
    </CloseWrapper>
  );
};

const TypeTournaments = [
  "singleElimination",
  "doubleElimination",
  "roundRobin",
  "groupState",
];

export default ModalBracket;
