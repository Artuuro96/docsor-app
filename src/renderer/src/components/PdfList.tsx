import { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import PdfThumbnail from './PdfThumbnail';
import { Grid } from '@mui/material';

interface PdfFile {
  id: string;
  file: File;
}

function PdfList({ files }: { files: File[] }): JSX.Element {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);

  useEffect(() => {
    const pdfFiles: PdfFile[] = files.map((file, index) => ({
      id: `${index}-${file.name}`,
      file,
    }));
    setPdfs(pdfFiles);
  }, [files]);

  const handleDragEnd = (event): void => {
    const { active, over } = event;
    console.log('active', active.id);
    console.log('over', over.id);

    if (!active.id !== over.id) {
      setPdfs((people) => {
        const oldIndex = people.findIndex((person) => person.id === active.id);
        const newIndex = people.findIndex((person) => person.id === over.id);

        console.log(arrayMove(people, oldIndex, newIndex));
        return arrayMove(people, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={pdfs} strategy={horizontalListSortingStrategy}>
          <Grid container spacing={4} sx={{ padding: '10px' }}>
            {pdfs.map((pdf) => (
              <>
                <PdfThumbnail key={pdf.id} id={pdf.id} content={pdf.file} />
              </>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  );
}

export default PdfList;
