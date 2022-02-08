import React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core";
import AppRoutes from "./Routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#db3a34",
      dark: "#141414"
    },
    secondary: {
      main: "#F7F7FF",
    },

  }

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes/>
    </ThemeProvider>
  );
}

export default App;
