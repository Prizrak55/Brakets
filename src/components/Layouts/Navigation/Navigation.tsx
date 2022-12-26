import styled from "styled-components";
import { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { Button } from "../UI/Button";
import ModalBracket from "../ModalBracket";
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
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    console.log(theme);
    setTheme(theme === "Light" ? "Dark" : "Light");
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const closeModal = () => {
    if (open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div onClick={() => closeModal()}>
      <HeaderEl>
        <Conteiner>
          <Wrapper>
            <Link to={`/`}>
              <Title>Bracket</Title>
            </Link>
            <Button onClick={toggleModal} text="Создать турнир" />
            <ModeSwittcher onClick={() => toggleTheme()}>
              {theme === "Light" ? <IoMoon size={18} /> : <IoSunny size={18} />}
              <span style={{ marginLeft: "10px" }}>{theme} Theme</span>
            </ModeSwittcher>
          </Wrapper>
        </Conteiner>
      </HeaderEl>
      {open && <ModalBracket />}
      <Outlet />
    </div>
  );
};

export default Navigation;
