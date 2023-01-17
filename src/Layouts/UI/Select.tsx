import styled from "styled-components";
import { TypeTournament } from "../../store/reducers/tournamentSlice";

interface Props {
  width: string;
}
const StyledSelect = styled.select<Props>`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: var(--colors-ui-bg);
  color: var(--colors-text);
  border-radius: 3px;
  width: 100%;
  width: ${(props) => (props.width ? props.width : "100%")};
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

type ISelect = {
  handleChange: (value: any) => void;
  data: string[];
  width?: string;
};

export const Select: React.FC<ISelect> = ({
  handleChange,
  data,
  width = "100%",
}) => {
  return (
    <StyledSelect
      width={width}
      onChange={(e) => handleChange(data[Number(e.target.value)])}
    >
      {data.map((item: any, index: number) => (
        <StyledOption key={index} value={String(index)}>
          {item}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};
