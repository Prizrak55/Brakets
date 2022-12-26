import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: var(--colors-ui-bg);
  color: var(--colors-text);
  border-radius: 3px;
  width: 100%;
  border: none;
  ::placeholder {
    color: var(--colors-text);
  }
`;

const StyledOption = styled.option`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: var(--colors-ui-bg);
  color: var(--colors-text);
  border-radius: 3px;
  width: 100%;
  border: none;
  ::placeholder {
    color: var(--colors-text);
  }
`;
export const Select = ({ change, data }: { change: any; data: string[] }) => {
  return (
    <StyledSelect onChange={(e) => change(data[Number(e.target.value)])}>
      {data.map((item: any, index: number) => (
        <StyledOption value={String(index)}>{item}</StyledOption>
      ))}
    </StyledSelect>
  );
};
