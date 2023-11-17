import { Divider, Grid } from '@mui/material';
import CardOption from './CardOption';
import Stepper from './Stepper';
import SelectFile from './SelectFile';
import { useState } from 'react';

export default function ToolsPage(): JSX.Element {
  const [showSelectFiles, setShowSelectFiles] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleStepper = (step: number): void => {
    setShowSelectFiles(false);
    setActiveStep(step);
  };

  return (
    <>
      <Grid container sx={{ display: 'flex' }} justifyContent="center">
        <Stepper activeStep={activeStep} />
      </Grid>
      <Divider sx={{ marginBottom: '10px', marginTop: '20px' }}></Divider>
      {showSelectFiles ? (
        <Grid container spacing={4} sx={{ padding: '10px' }}>
          <Grid item xs={3} onClick={(): void => handleStepper(1)}>
            <CardOption
              title="Unir PDF"
              description="Selecciona y une archivos PDF para formar uno solo"
              icon="mergeDoc"
            />
          </Grid>
          <Grid item xs={3} onClick={(): void => handleStepper(1)}>
            <CardOption
              title="Asegura tu PDF"
              description="Agrega contraseña y protege tu archivo pdf"
              icon="lockDoc"
            />
          </Grid>
          <Grid item xs={3} onClick={(): void => handleStepper(1)}>
            <CardOption
              title="PDF a Imagen"
              description="Tranforma un archivo PDF seleccionado en una imagen"
              icon="imageDoc"
            />
          </Grid>
          <Grid item xs={3} onClick={(): void => handleStepper(1)}>
            <CardOption
              title="Comprimir PDF"
              description="Selecciona y comprime multiples archivos PDF"
              icon="compresionDoc"
            />
          </Grid>
        </Grid>
      ) : (
        <SelectFile />
      )}
    </>
  );
}
