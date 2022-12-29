import { useEffect } from "react";
import {
  setTourtaments,
  Tournament,
} from "../../store/reducers/tournamentSlice";
import axios from "axios";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";

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

const AllTourtaments = () => {
  const dispatch = useAppDispatch();

  const tournaments = useAppSelector(
    ({ tournament }) => tournament.tournaments
  );
  const filterName = useAppSelector(({ filter }) => filter.filterName);
  const filterType = useAppSelector(({ filter }) => filter.filterType);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/brackets`)
      .then((response) => dispatch(setTourtaments(response.data)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {tournaments &&
        tournaments
          .filter(
            (itemFilter: Tournament) =>
              itemFilter.name.toLowerCase().search(filterName.toLowerCase()) !==
              -1
          )
          .filter(
            (itemType: Tournament) =>
              itemType.type.toLowerCase().search(filterType.toLowerCase()) !==
              -1
          )
          .map((item: Tournament) => {
            return (
              <Conteiner key={item.id}>
                <TextH2>{item.name}</TextH2>
                <Wrapper>
                  <Status active={Boolean(item.status)}>
                    {item.status ? "активен" : "не активен"}
                  </Status>
                  <Text>
                    {`${new Date(item.createAt).getDate()}:${new Date(
                      item.createAt
                    ).getMonth()}:${new Date(item.createAt).getFullYear()}`}
                  </Text>
                </Wrapper>
                <Text>Команд: {item.comands?.length}</Text>
              </Conteiner>
            );
          })}
    </>
  );
};

export default AllTourtaments;