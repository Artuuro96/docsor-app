import { Grid } from '@mui/material';
import CardOption from './CardOption';
import CustomizedSteppers from './CustomizedStepper';

export default function ToolsPage(): JSX.Element {
  return (
    <>
      <CustomizedSteppers />
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <CardOption
            title="Unir PDF"
            description="Selecciona y une archivos PDF para formar uno solo"
          />
        </Grid>
        <Grid item xs={3}>
          <CardOption
            title="Asegura tu PDF"
            description="Agrega contraseña y protege tu archivo pdf"
          />
        </Grid>
        <Grid item xs={3}>
          <CardOption
            title="PDF a Imagen"
            description="Tranforma un archivo PDF seleccionado en una imagen"
          />
        </Grid>
        <Grid item xs={3}>
          <CardOption
            title="Comprimir PDF"
            description="Selecciona y comprime multiples archivos PDF"
          />
        </Grid>
      </Grid>
    </>
  );
}
