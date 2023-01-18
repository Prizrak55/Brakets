import axios from "axios";
import { errorMonitor } from "events";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getOneTournament,
  Tournament,
} from "../../store/reducers/tournamentSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 4px 0 4px 0;
  font-size: 16px;
`;

const Text = styled.p`
  margin: 4px 0 4px 0;
`;

const ConteinerTeam = styled.div`
  box-shadow: var(--shadow);
  width: 200px;
  padding: 8px;
  margin: 16px 0 0 0;
  border-radius: 5px;
`;

const StatsTournament = () => {
  const { id } = useParams();
  const { tournament, error, status } = useAppSelector(
    ({ tournament }) => tournament
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getOneTournament(id));
  }, [dispatch, id]);

  return (
    <>
      {status === "loading" && <h2>загрузка</h2>}
      {error && <h2>Ошибка: {error}</h2>}
      {tournament && (
        <Wrapper>
          <Title>{tournament.name}</Title>
          <Text>{tournament.status ? "активен" : "завершен"}</Text>
          <Text>{String(tournament.createAt)}</Text>
          <Text>{tournament.type}</Text>

          <ConteinerTeam>
            <Text>Команды: </Text>
            {!!tournament.comands && (
              <>
                {tournament.comands.map((comand) => {
                  return <Text>{comand}</Text>;
                })}
              </>
            )}
          </ConteinerTeam>
        </Wrapper>
      )}
    </>
  );
};

export default StatsTournament;
