import React, { useEffect, useState } from "react";
import { createNewTeam, getTeams, Team } from "../../store/reducers/teamSlice";
import { Input } from "../UI/Input";
import styled from "styled-components";
import { Button } from "../UI/Button";
import { useAppDispatch, useAppSelector } from "../../store";
import uuid from "react-uuid";
import { TeamPlayers } from "./Types";
import { checkObjNull } from "../../utils/checkObjNull";

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
const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

type IModalTeam = {
  close: () => void;
};

const ModalTeam: React.FC<IModalTeam> = ({ close }) => {
  const [team, setTeam] = useState<Team>({
    id: "",
    name: "",
    players: [""],
    reservePlayers: [""],
  });

  const { teams } = useAppSelector(({ team }) => team);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleTeam = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setTeam({ ...team, [name]: e.target.value });
  };

  const handleAddPlayers = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: TeamPlayers
  ) => {
    let takePlayers = team[name];
    takePlayers[index] = e.target.value;
    setTeam({
      ...team,
      [name]: takePlayers,
    });
  };

  const addRowPlayer = (name: TeamPlayers) => {
    if (name === "reservePlayers" && team.reservePlayers.length === 2) {
      alert("Запасных игроков может быть только 2");
      return;
    }
    if (name === "players" && team.players.length === 5) {
      alert("Основных игроков может быть только 5");
      return;
    }
    setTeam({
      ...team,
      [name]: [...team[name], ""],
    });
  };
  const deleteRowPlayer = (name: TeamPlayers) => {
    if (name === "reservePlayers" && team.reservePlayers.length === 0) {
      return;
    }
    if (name === "players" && team.players.length === 1) {
      alert("В команде должен быть хотябы 1 игрок");
      return;
    }
    let takePlayers = team[name];
    takePlayers.pop();
    setTeam({
      ...team,
      [name]: takePlayers,
    });
  };

  const addTeam = () => {
    const checkName = teams.every(
      (teamArrName) => teamArrName.name !== team.name
    );

    if (!checkName) {
      alert("Название команды уже существует");
      return;
    }
    if (checkObjNull(team)) {
      alert("заполните все поля");
      return;
    }

    const data = { ...team, id: uuid() };
    dispatch(createNewTeam(data));
    close();
  };

  return (
    <CloseWrapper onClick={() => close()}>
      <Conteiner onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <Input
            type="text"
            value={team.name}
            placeholder="Название команды"
            onChange={(e) => handleTeam(e, "name")}
          />

          <Text>Основные игроки</Text>
          <button onClick={() => addRowPlayer("players")}>
            добавить игрока
          </button>
          <button onClick={() => deleteRowPlayer("players")}>
            удалить игрока
          </button>
          {team.players.map((player: string, index: number) => {
            return (
              <Input
                key={index}
                type="text"
                placeholder="Имя основного игрока"
                value={player}
                onChange={(e) => handleAddPlayers(e, index, "players")}
              />
            );
          })}

          <Text>Резервные игроки</Text>
          <button onClick={() => addRowPlayer("reservePlayers")}>
            добавить игрока
          </button>
          <button onClick={() => deleteRowPlayer("reservePlayers")}>
            удалить игрока
          </button>
          {team.reservePlayers.map((player: string, index: number) => {
            return (
              <Input
                key={index}
                placeholder="Имя запасного игрока"
                type="text"
                value={player}
                onChange={(e) => handleAddPlayers(e, index, "reservePlayers")}
              />
            );
          })}
          <Button text="Создать команду" onClick={addTeam} />
        </Wrapper>
      </Conteiner>
    </CloseWrapper>
  );
};

export default ModalTeam;
