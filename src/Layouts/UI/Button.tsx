import styled from "styled-components";

export type IButton = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  disabled?: boolean;
  primary?: string;
  width?: string;
  margin?: string;
};

interface Props {
  width: string;
  margin: string;
}

const StyledButton = styled.button<Props>`
  border-radius: 0.2rem;
  cursor: pointer;
  background-color: var(--colors-bg);
  color: var(--colors-text);
  margin: ${(props) => props.margin};
  padding: 0.5em 1em;
  width: ${(props) => props.width};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  border: 2px solid black;
  transition: box-shadow 0.1s ease;
  border-color: var(--colors-ui-border);
`;

export const Button: React.FC<IButton> = ({
  onClick,
  text,
  width = "auto",
  margin = "auto",
}) => {
  return (
    <StyledButton margin={margin} onClick={onClick} width={width}>
      {text}
    </StyledButton>
  );
};
