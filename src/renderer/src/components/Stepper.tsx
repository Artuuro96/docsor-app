import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useState, useRef, useEffect } from 'react';

export default function Stepper({ activeStep }: { activeStep: number }): JSX.Element {
  const [value, setValue] = useState('recents');
  const [downloadBtnDisabled, setDownloadBtnDisabled] = useState(true);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true);
  const elRefs = [useRef(null), useRef(null), useRef(null)];

  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleFileSelection = (event: React.SyntheticEvent): void => {
    setUploadBtnDisabled(false);
    simulateClick(elRefs[1]);
  };

  const handleFileUpload = (event: React.SyntheticEvent): void => {
    setDownloadBtnDisabled(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const simulateClick = (ref: React.MutableRefObject<any>): void => {
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  useEffect(() => {
    if (activeStep === 0) {
      simulateClick(elRefs[0]); // Simular clic en la primera acción
    } else if (activeStep === 1) {
      simulateClick(elRefs[1]); // Simular clic en la segunda acción
    } else if (activeStep === 2) {
      simulateClick(elRefs[2]); // Simular clic en la tercera acción
    }
  }, [activeStep]);

  return (
    <BottomNavigation
      sx={{
        width: 500,
        backgroundColor: (theme) => theme.palette.secondary.dark,
        borderRadius: '10px',
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        ref={elRefs[0]}
        label="Elige una herramienta"
        value="tool"
        icon={<BuildRoundedIcon />}
        onClick={handleFileSelection}
      />
      <BottomNavigationAction
        ref={elRefs[1]}
        label="Sube tus archivos"
        value="upload"
        icon={<DriveFolderUploadIcon />}
        disabled={uploadBtnDisabled}
        onClick={handleFileUpload}
      />
      <BottomNavigationAction
        ref={elRefs[2]}
        label="Descargar"
        value="download"
        icon={<DownloadForOfflineIcon />}
        disabled={downloadBtnDisabled}
      />
    </BottomNavigation>
  );
}
