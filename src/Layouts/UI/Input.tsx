import styled from "styled-components";

export const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: var(--colors-ui-bg);
  color: var(--colors-text);
  border-radius: 3px;
  width: ${(props) => (props.width ? props.width : "100%")};
  border: none;
  ::placeholder {
    color: var(--colors-text);
  }
`;
