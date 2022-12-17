import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Brackets from "./pages/Brackets";

const light: ThemeOptions = {
  palette: {
    mode: "light",
    secondary: {
      main: "#fff",
    },
  },
};

const dark: ThemeOptions = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleChangeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Dashboard toggleTheme={handleChangeTheme} />
      <Brackets />
    </ThemeProvider>
  );
}

export default App;
