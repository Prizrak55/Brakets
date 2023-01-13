import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  const params = useParams();
  const [tournament, setTournament] = useState<any>("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/brackets/${params.id}`)
      .then((resp) => setTournament(resp.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {tournament && (
        <Wrapper>
          <Title>{tournament.name}</Title>
          <Text>{tournament.status ? "активен" : "завершен"}</Text>
          <Text>{tournament.createAt}</Text>
          <Text>{tournament.type}</Text>

          <ConteinerTeam>
            <Text>Команды: </Text>
            {tournament?.comands.map((comand: string[]) => {
              return <Text>{comand}</Text>;
            })}
          </ConteinerTeam>
        </Wrapper>
      )}
    </>
  );
};

export default StatsTournament;
