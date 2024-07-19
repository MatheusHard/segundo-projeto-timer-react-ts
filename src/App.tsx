import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router";
import { CyclesContextProvider } from "./context/CyclesContext";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>{/* Este contexto passa para a Home e History */} 
          <Router/>
        </CyclesContextProvider>
      </BrowserRouter>
      {/*Estilo Global*/}
      <GlobalStyle/>
    </ThemeProvider>
  )
}

