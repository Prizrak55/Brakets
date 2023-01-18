import React, { useState } from "react";
import { createNewTeam, Team } from "../store/reducers/teamSlice";
import { Input } from "./UI/Input";
import styled from "styled-components";
import { Button } from "./UI/Button";
import { useAppDispatch } from "../store";
import uuid from "react-uuid";

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

  const dispatch = useAppDispatch();

  const handleTeam = (e: any, name: string) => {
    setTeam({ ...team, [name]: e.target.value });
  };

  const handleAddPlayers = (
    e: any,
    index: number,
    name: "players" | "reservePlayers"
  ) => {
    let takePlayers = team[name];
    takePlayers[index] = e.target.value;
    setTeam({
      ...team,
      [name]: takePlayers,
    });
  };

  const addRowPlayer = (name: "players" | "reservePlayers") => {
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

  const addTeam = () => {
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
