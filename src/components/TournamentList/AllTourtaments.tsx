import { useEffect, useMemo } from "react";
import {
  deleteTournament,
  getTournaments,
  Tournament,
} from "../../store/reducers/tournamentSlice";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { FiEdit2, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Conteiner = styled.div`
  box-shadow: var(--shadow);
  width: 200px;
  padding: 8px;
  margin: 8px;
  border-radius: 5px;
`;

const TextH2 = styled.h2`
  font-size: 16px;
  text-align: center;
`;

const Status = styled.p`
  border: 2px solid;
  padding: 3px;
  border-radius: 3px;
  border-color: ${(props: { active: boolean }) =>
    props.active ? "#f7ab55" : "black"};
`;

const Text = styled.p`
  font-size: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const AllTourtaments = () => {
  const { tournaments, status, error } = useAppSelector(
    ({ tournament }) => tournament
  );
  const { filterName, filterType } = useAppSelector(({ filter }) => filter);

  const dispatch = useAppDispatch();

  const filterTournaments = useMemo(() => {
    if (!filterName && !filterType) {
      return tournaments;
    } else {
      console.log(filterName, " ", filterType);
      return tournaments.filter(
        (itemFilter: Tournament) =>
          itemFilter.name.toLowerCase().search(filterName.toLowerCase()) !==
            -1 &&
          itemFilter.type.toLowerCase().search(filterType.toLowerCase()) !== -1
      );
    }
  }, [tournaments, filterName, filterType]);

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

  const deleteOneTournament = (e: any, id: string) => {
    e.preventDefault();
    dispatch(deleteTournament(id));
  };

  const transformDate = (date: Date) => {
    const newDate = new Date(date);
    const transformDate = `${newDate.getDate()}:${newDate.getMonth()}:${newDate.getFullYear()}`;
    return transformDate;
  };

  return (
    <>
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>Error {error}</h2>}

      {filterTournaments.map((item: Tournament) => {
        return (
          <Link key={item.id} to={`/tournament/${item.id}`}>
            <Conteiner>
              <TextAndEditWrapper>
                <TextH2>{item.name}</TextH2>
                <>
                  <Link to={`/redactor-tournament/${item.id}`}>
                    <BorderEdit>
                      <FiEdit2 />
                    </BorderEdit>
                  </Link>
                  <BorderDelete
                    onClick={(e) => deleteOneTournament(e, item.id)}
                  >
                    <FiXCircle />
                  </BorderDelete>
                </>
              </TextAndEditWrapper>
              <Wrapper>
                <Status active={Boolean(item.status)}>
                  {item.status ? "активен" : "не активен"}
                </Status>
                <Text>{transformDate(item.createAt)}</Text>
              </Wrapper>
              <Text>Команд: {item.comands?.length}</Text>
            </Conteiner>
          </Link>
        );
      })}
    </>
  );
};

export default AllTourtaments;
