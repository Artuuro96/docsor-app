import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from './pallete';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
// Define el tema personalizado con la fuente deseada

const theme = createTheme({
  typography: {
    fontFamily: ['Jost', 'sans-serif'].join(','), // Agrega otras fuentes si es necesario
  },
  palette,
});

// Componente principal que envuelve tu aplicación con el tema y CssBaseline
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
