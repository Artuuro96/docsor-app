import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

interface PdfItemProps {
  id: string;
  content: File;
}

const PdfThumbnail = ({ id, content }: PdfItemProps): JSX.Element => {
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`Coordenadas del clic: (${x}, ${y})`);
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (content) {
      (async function (): Promise<void> {
        const pdfJS = await import('pdfjs-dist/build/pdf');
        pdfJS.GlobalWorkerOptions.workerSrc =
          window.location.origin + '/src/assets/scripts/pdf.worker.min.js';

        const fileReader = new FileReader();
        fileReader.onload = async function (event): Promise<void> {
          const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
          const pdf = await pdfJS.getDocument(typedArray).promise;

          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 0.5, rotation: 0 });

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
        sx={{ ':hover': { cursor: 'pointer' } }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={canvasRef} style={{ height: '25vh' }} onClick={handleCanvasClick} />
        </CardContent>
        <Typography
          variant="body1"
          noWrap
          sx={{ padding: '2px', fontSize: '13px', minHeight: '30px', textAlign: 'center' }}
        >
          {id}
        </Typography>
      </Card>
    </Grid>
  );
};

export default PdfThumbnail;
