import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../Layouts/UI/Button";
import { Input } from "../../Layouts/UI/Input";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTeam, Team, updateOneTeam } from "../../store/reducers/teamSlice";
import { checkObjNull } from "../../utils/checkObjNull";

import { TeamPlayers } from "./Types";

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

const Redactor = () => {
  const [newTeam, setNewTeam] = useState<Team>({} as Team);
  const { team, teams } = useAppSelector(({ team }) => team);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    team && setNewTeam(team);
  }, [team]);

  useEffect(() => {
    id && dispatch(getTeam(id));
  }, [dispatch, id]);

  const handleAddPlayers = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: TeamPlayers
  ) => {
    let takePlayers = [...newTeam[name]];
    takePlayers[index] = e.target.value;

    setNewTeam({
      ...newTeam,
      [name]: takePlayers,
    });
  };

  const addRowPlayer = (name: TeamPlayers) => {
    if (name === "reservePlayers" && newTeam.reservePlayers.length === 2) {
      alert("Запасных игроков может быть только 2");
      return;
    }
    if (name === "players" && newTeam.players.length === 5) {
      alert("Основных игроков может быть только 5");
      return;
    }
    setNewTeam({
      ...newTeam,
      [name]: [...newTeam[name], ""],
    });
  };

  const handleTeam = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setNewTeam({ ...newTeam, [name]: e.target.value });
  };
  const deleteRowPlayer = (name: TeamPlayers) => {
    if (name === "reservePlayers" && newTeam.reservePlayers.length === 0) {
      return;
    }
    if (name === "players" && newTeam.players.length === 1) {
      alert("В команде должен быть хотябы 1 игрок");
      return;
    }
    let takePlayers = [...newTeam[name]];
    takePlayers.pop();
    setNewTeam({
      ...newTeam,
      [name]: takePlayers,
    });
  };

  const addTeam = () => {
    const checkName = teams
      .filter((team) => team.id !== newTeam.id)
      .every((teamArrName) => teamArrName.name !== newTeam.name);

    if (!checkName) {
      alert("Такое имя уже используется");
      return;
    }
    if (checkObjNull(newTeam)) {
      alert("заполните все поля");
      return;
    }

    dispatch(updateOneTeam(newTeam));
  };

  return (
    <>
      {!!Object.keys(newTeam).length && (
        <Wrapper>
          <Input
            type="text"
            value={newTeam.name}
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
          {newTeam.players.map((player: string, index: number) => {
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
          {newTeam.reservePlayers.map((player: string, index: number) => {
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
      )}
    </>
  );
};

export default Redactor;
