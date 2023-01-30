import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTeam } from "../../store/reducers/teamSlice";

const Title = styled.h1`
  margin: 4px 0 4px 0;
  font-size: 16px;
`;

const Text = styled.p`
  margin: 4px 0 4px 0;
`;

const StatsTeam = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { team, status, error } = useAppSelector(({ team }) => team);

  useEffect(() => {
    id && dispatch(getTeam(id));
  }, [dispatch, id]);

  return (
    <>
      {status === "loading" && <Text>Загрузка...</Text>}
      {error && (
        <Text>
          <>{error}</>
        </Text>
      )}
      <Title>Статистика команды: {team?.name}</Title>
      <Text>Игроки:</Text>
      {team?.players.map((player) => (
        <Text>{player}</Text>
      ))}
      <Text>Резервные игроки:</Text>
      {team?.reservePlayers.map((reservePlayers) => (
        <Text>{reservePlayers}</Text>
      ))}
    </>
  );
};

export default StatsTeam;
