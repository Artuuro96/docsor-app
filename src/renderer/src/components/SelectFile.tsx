import { Button, Grid, styled } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import PdfList from './PdfList';
import PdfViewer from './PdfViewer';
export interface SelectFileProps {
  handleStepper: (step: number) => void;
}

export default function SelectFile({ handleStepper }: SelectFileProps): JSX.Element {
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [showDownloadView, setShowDownloadView] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string>('');
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [showUploadBtn, setShowUploadBtn] = useState(true);
  const [pdf, setPdf] = useState<File>([]);

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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files;
    if (!files || !files.length) {
      alert('Please select at least one PDF file and enter a password.');
      return;
    }
    setFilesToUpload(Array.from(files));
    setShowUploadBtn(false);
  };

  const handleDownload = (): void => {
    if (downloadLink) {
      const downloadLinkElement = document.createElement('a');
      downloadLinkElement.href = downloadLink;
      downloadLinkElement.download = 'merged_files.pdf'; // Cambia el nombre de descarga según tus necesidades
      downloadLinkElement.click();
    }
  };

  const handleUpload = async (): Promise<void> => {
    const formData = new FormData();
    for (const file of filesToUpload) {
      formData.append('files', file);
    }
    let response;

    try {
      response = await fetch('http://127.0.0.1:5000/merge', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
    const blob = await response.blob();
    const downloadLink = document.createElement('a');
    const file = new File([blob], 'pdf-merged');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'merged_files.pdf'; // Change the download name as needed
    setPdf(file);
    setShowDownload(true);
    setDownloadLink(downloadLink.href);
    handleStepper(2);
    setShowDownloadView(true);
  };

  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}
      >
        {showUploadBtn ? (
          <Button
            variant="contained"
            component="label"
            size="large"
            sx={{ borderRadius: '10px', height: '60px', fontSize: '25px' }}
            style={{ textTransform: 'none' }}
          >
            Seleccionar Archivos
            <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
          </Button>
        ) : (
          <>
            {showDownloadView ? (
              <PdfViewer content={pdf} />
            ) : (
              <>
                <PdfList files={filesToUpload} />
                <Button
                  variant="contained"
                  component="label"
                  size="large"
                  sx={{ borderRadius: '10px', height: '50px', fontSize: '20px' }}
                  style={{ textTransform: 'none' }}
                  onClick={handleUpload}
                >
                  Subir Archivos
                </Button>
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
}
