import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const TopBar = ({ toggleTheme, openDrawer }: any) => {
  const theme = useTheme();
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {theme.palette.mode === "light" ? (
            <IconButton onClick={toggleTheme}>
              <DarkModeIcon color="secondary" />
            </IconButton>
          ) : (
            <IconButton onClick={toggleTheme}>
              <WbSunnyIcon />
            </IconButton>
          )}

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
