import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, styled } from '@mui/material';
import { useEffect, useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

interface PdfItemProps {
  id: string;
  content: File;
}

const HoverCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '15px',
    cursor: 'pointer',
  },
}));

function PdfItem({ id, content }: PdfItemProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (content) {
      (async function (): Promise<void> {
        const pdfJS = await import('pdfjs-dist/build/pdf');
        pdfJS.GlobalWorkerOptions.workerSrc =
          window.location.origin + '/src/assets/pdf.worker.min.js';

        const fileReader = new FileReader();
        fileReader.onload = async function (event) {
          const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
          const pdf = await pdfJS.getDocument(typedArray).promise;

          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 0.1, rotation: 0 });

          const canvas = canvasRef.current;
          const canvasContext = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = { canvasContext, viewport };
          page.render(renderContext);
        };

        fileReader.readAsArrayBuffer(content);
      })();
    }
  }, [content]);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid item xs={2.5}>
      <Card
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{ ':hover': { cursor: 'pointer', position: 'relative' } }}
      >
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              sx={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                zIndex: 1, // Asegura que esté por encima del contenido del Card
              }}
            >
              <CancelIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={canvasRef} style={{ height: '25vh' }} />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PdfItem;
