import styled from "styled-components";
import { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../UI/Button";
import ModalBracket from "../ModalTournament";
import ModalTeam from "../ModalTeam";
const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;
const Conteiner = styled.div`
  width: 100%;
  padding: 0 2rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;
const Title = styled.p`
  font-weight: var(--fw-normal);
`;

const ModeSwittcher = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Navigation = () => {
  const [theme, setTheme] = useState("Light");
  const [openTournamentModal, setOpenTournamentModal] = useState(false);
  const [openTeamModal, setTeamModal] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "Light" ? "Dark" : "Light");
  };

  const toggleTournamentModal = () => {
    setOpenTournamentModal(!openTournamentModal);
  };
  const toggleTeamModal = () => {
    setTeamModal(!openTeamModal);
  };

  const closeModal = () => {
    if (openTournamentModal) {
      setOpenTournamentModal(false);
    }
    if (openTeamModal) {
      setTeamModal(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <HeaderEl>
        <Conteiner>
          <Wrapper>
            <Link to={`/`}>
              <Title>Bracket</Title>
            </Link>
            <Button onClick={toggleTournamentModal} text="Создать турнир" />
            <Button onClick={toggleTeamModal} text="Создать команду" />
            <ModeSwittcher onClick={() => toggleTheme()}>
              {theme === "Light" ? <IoMoon size={18} /> : <IoSunny size={18} />}
              <span style={{ marginLeft: "10px" }}>{theme} Theme</span>
            </ModeSwittcher>
          </Wrapper>
        </Conteiner>
      </HeaderEl>
      {openTournamentModal && <ModalBracket close={closeModal} />}
      {openTeamModal && <ModalTeam close={closeModal} />}
      <Outlet />
    </div>
  );
};

export default Navigation;
