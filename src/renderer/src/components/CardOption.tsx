import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { Card, CardActions, CardContent, Button, Typography, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface CardOptionProps {
  title: string;
  description: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const HoverCard = styled(Card)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '15px',
  boxShadow: `4px 8px ${theme.palette.primary.main}`,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.08)',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '15px',
    boxShadow: `4px 8px ${theme.palette.primary.main}`,
    cursor: 'pointer',
  },
}));

function CardOption({ title, description }: CardOptionProps): JSX.Element {
  const [showDownload, setShowDownload] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files;
    if (!files || !files.length) {
      alert('Please select at least one PDF file and enter a password.');
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    const response = await fetch('http://127.0.0.1:5000/merge', {
      method: 'POST',
      body: formData,
    });

    const blob = await response.blob();

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'merged_files.pdf'; // Change the download name as needed
    setShowDownload(true);
    setDownloadLink(downloadLink.href);
  };

  const handleDownload = (): void => {
    if (downloadLink) {
      const downloadLinkElement = document.createElement('a');
      downloadLinkElement.href = downloadLink;
      downloadLinkElement.download = 'merged_files.pdf'; // Cambia el nombre de descarga según tus necesidades
      downloadLinkElement.click();
    }
  };

  return (
    <HoverCard>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 30 }} gutterBottom>
            <b>{title}</b>
          </Typography>
          <Typography variant="body2">
            <b>{description}</b>
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          {showDownload ? (
            <Button
              size="small"
              component="label"
              variant="contained"
              onClick={handleDownload}
              sx={{ borderRadius: '15px' }}
              style={{ textTransform: 'none' }}
              startIcon={<CloudDownloadIcon />}
            >
              Descargar
            </Button>
          ) : (
            <Button
              size="small"
              component="label"
              variant="outlined"
              sx={{ borderRadius: '15px' }}
              style={{ textTransform: 'none' }}
              startIcon={<CloudUploadIcon />}
            >
              Seleccionar Archivo(s)
              <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
            </Button>
          )}
        </CardActions>
      </Card>
    </HoverCard>
  );
}

export default CardOption;
