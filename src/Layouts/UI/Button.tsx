import styled from "styled-components";

export type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // to handle onClick functions
  text: string;
  disabled?: boolean; // make the button disabled or not
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

export const Button = ({
  onClick,
  text,
  width = "auto",
  margin = "auto",
}: ButtonProps) => {
  return (
    <StyledButton margin={margin} onClick={onClick} width={width}>
      {text}
    </StyledButton>
  );
};
