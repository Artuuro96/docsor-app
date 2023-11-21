import { Toolbar, AppBar, IconButton, Box, Typography, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef } from 'react';

interface PdfItemProps {
  content: File;
}

const PdfViewer = ({ content }: PdfItemProps): JSX.Element => {
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`Coordenadas del clic: (${x}, ${y})`);
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderPage = async (page: number): Promise<void> => {
    const pdfJS = await import('pdfjs-dist/build/pdf');
    const pageNumber = page;
    pdfJS.GlobalWorkerOptions.workerSrc =
      window.location.origin + '/src/assets/scripts/pdf.worker.min.js';

    const fileReader = new FileReader();
    fileReader.onload = async function (event): Promise<void> {
      const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
      const pdf = await pdfJS.getDocument(typedArray).promise;

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.23, rotation: 0 });

      const canvas = canvasRef.current;
      if (canvas) {
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
      } else {
        throw new Error('Canvas is null');
      }
    };

    fileReader.readAsArrayBuffer(content);
  };

  useEffect(() => {
    if (content) {
      renderPage(1);
    }
  }, [content]);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: (theme) => theme.palette.secondary.dark, borderRadius: 1 }}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <KeyboardArrowRightIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button variant="contained">Descargar</Button>
          </Box>
        </Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ textAlign: 'center', marginTop: -5, marginBottom: 1 }}
        >
          Página 1 / 10
        </Typography>
      </AppBar>

      <canvas ref={canvasRef} onClick={handleCanvasClick} />
    </>
  );
};

export default PdfViewer;
