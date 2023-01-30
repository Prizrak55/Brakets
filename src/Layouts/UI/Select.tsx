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
  filterName?: string;
};

export const Select: React.FC<ISelect> = ({
  handleChange,
  data,
  width = "100%",
  filterName = "выберите фильтр",
}) => {
  const change = (e: { target: { value: string } }) => {
    if (e.target.value) {
      handleChange(e.target.value);
      return;
    }
    handleChange("");
  };
  return (
    <StyledSelect width={width} onChange={change}>
      <StyledOption value={""}>{filterName}</StyledOption>
      {data.map((item: string, index: number) => {
        return (
          <StyledOption key={index} value={String(item)}>
            {item}
          </StyledOption>
        );
      })}
    </StyledSelect>
  );
};
