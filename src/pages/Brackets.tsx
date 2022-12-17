import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const Brackets = () => {
  const count = useSelector((state: any) => state.toolkit);
  const dispatch = useDispatch();
  const theme = useTheme();

  return <Box sx={{ height: "1500px" }}>Привет андрей</Box>;
};

export default Brackets;
