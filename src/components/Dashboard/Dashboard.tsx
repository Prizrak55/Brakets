import { Box } from "@mui/material";
import { useState } from "react";
import LeftDrawer from "./LeftDrawer";
import TopBar from "./TopBar";

const Dashboard = ({ toggleTheme }: any) => {
  const [open, setOpen] = useState(false);
  const hendleToggleOpen = () => {
    setOpen(!open);
  };
  const handleChangeState = () => {
    setOpen(false);
  };
  return (
    <Box>
      <TopBar toggleTheme={toggleTheme} openDrawer={hendleToggleOpen} />
      <LeftDrawer open={open} handleChangeState={handleChangeState} />
    </Box>
  );
};

export default Dashboard;
