import { Button } from "./components/Button/Button";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
    <Button variant="warning"/>
    <Button variant="danger"/>
    
    {/*Estilo Global*/}
    <GlobalStyle/>
    </ThemeProvider>
  )
}

