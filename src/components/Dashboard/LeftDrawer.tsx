import { Box, Drawer } from "@mui/material";

const LeftDrawer = ({ open, handleChangeState }: any) => {
  return (
    <Drawer open={open} anchor="left" onClose={() => handleChangeState(false)}>
      <Box>привет</Box>
    </Drawer>
  );
};

export default LeftDrawer;
