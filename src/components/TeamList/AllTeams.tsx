import React, { useEffect } from "react";
import { FiEdit2, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteTeam, getTeams } from "../../store/reducers/teamSlice";

const ConteinerTeam = styled.div`
  box-shadow: var(--shadow);
  width: 200px;
  padding: 8px;
  margin: 8px;
  border-radius: 5px;
`;
const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const BaseText = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;
const TextAndEditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BorderEdit = styled.div`
  cursor: pointer;
  display: inline-flex;
  padding: 2px;
  border: 2px solid #b95959;
  border-radius: 4px;
  :hover {
    opacity: 0.8;
  }
`;
const BorderDelete = styled.div`
  cursor: pointer;
  display: inline-flex;
  padding: 2px;
  margin-left: 2px;
  border: 2px solid #7659b9;
  border-radius: 4px;
  :hover {
    opacity: 0.8;
  }
`;

const AllTeams = () => {
  const dispatch = useAppDispatch();
  const { teams, status, error } = useAppSelector(({ team }) => team);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const deleteOneTeam = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(deleteTeam(id));
  };
  return (
    <>
      {status === "loading" && <Text>Загрузка...</Text>}
      {error && (
        <Text>
          <>{error}</>
        </Text>
      )}
      {teams.map((team) => {
        return (
          <ConteinerTeam key={team.id}>
            <>
              <Link to={`/team/${team.id}`}>
                <TextAndEditWrapper>
                  <Text>{team.name}</Text>
                  <>
                    <Link to={`/redactor-team/${team.id}`}>
                      <BorderEdit>
                        <FiEdit2 />
                      </BorderEdit>
                    </Link>
                    <BorderDelete onClick={(e) => deleteOneTeam(e, team.id)}>
                      <FiXCircle />
                    </BorderDelete>
                  </>
                </TextAndEditWrapper>
                <BaseText>Игроков: {team.players.length}</BaseText>
                <BaseText>
                  Запасных игроков: {team.reservePlayers.length}
                </BaseText>
              </Link>
            </>
          </ConteinerTeam>
        );
      })}
    </>
  );
};

export default AllTeams;
