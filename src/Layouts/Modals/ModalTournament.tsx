import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../store";
import { getTeams } from "../../store/reducers/teamSlice";
import {
  TypeTournament,
  StatusTournament,
  createNewTournament,
  Tournament,
} from "../../store/reducers/tournamentSlice";
import { checkObjNull } from "../../utils/checkObjNull";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";

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

const WrapperTeams = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Text = styled.div`
  font-size: 14px;
`;
type IModalBracket = {
  close: () => void;
};

const ModalBracket: React.FC<IModalBracket> = ({ close }) => {
  const [name, setName] = useState("");
  const [typeBracket, setTypeBracket] = useState<TypeTournament>("");
  const { teams } = useAppSelector(({ team }) => team);
  const [newTeams, setNewTeams] = useState<string[]>([]);

  const { tournaments } = useAppSelector(({ tournament }) => tournament);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const changeName = (value: string) => {
    setName(value);
  };

  const changeType = (value: TypeTournament) => {
    setTypeBracket(value);
  };
  const addTeamInTournament = (id: string) => {
    let newComands = [...newTeams];
    if (newComands.some((teamId) => teamId === id)) {
      newComands = newComands.filter((teamId) => teamId !== id);
    } else {
      newComands.push(id);
    }
    setNewTeams(newComands);
  };

  const createBracket = async () => {
    if (name === "") {
      alert("Заполните форму");
      return;
    }
    if (typeBracket === "") {
      alert("Заполните тип");
      return;
    }

    const checkName = tournaments.every(
      (tournamentArr) => tournamentArr.name !== name
    );
    if (!checkName) {
      alert("Команда с таким именем уже существует");
      return;
    }

    const data: Tournament = {
      id: uuid(),
      name,
      status: StatusTournament.Inactive,
      createAt: new Date(),
      type: typeBracket,
      teams: newTeams,
    };

    if (checkObjNull(data)) {
      alert("заполните все поля");
      return;
    }

    dispatch(createNewTournament(data));
    close();

    navigate("/create-bracket");
  };

  return (
    <CloseWrapper onClick={() => close()}>
      <Conteiner onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <Input
            type={"text"}
            value={name}
            onChange={(e) => changeName(e.target.value)}
            placeholder="Название"
          />
          <Select
            filterName="типа турнира"
            handleChange={changeType}
            data={TypeTournaments}
          />

          <Button
            onClick={createBracket}
            margin="10px 0 10px 0"
            width={"200px"}
            text="Создать турнир"
          />
          {teams &&
            teams.map((team) => {
              return (
                <WrapperTeams key={team.id}>
                  <Input
                    type={"checkbox"}
                    onChange={() => addTeamInTournament(team.id)}
                  />
                  <Text>{team.name}</Text>
                </WrapperTeams>
              );
            })}
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
