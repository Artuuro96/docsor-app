import { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import PdfItem from './PdfItem';
import { Grid } from '@mui/material';

interface PdfFile {
  id: string;
  file: File;
}

function PdfList({ files }: { files: File[] }): JSX.Element {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);

  useEffect(() => {
    // Convertir los archivos File en objetos con una propiedad id única
    const pdfFiles: PdfFile[] = files.map((file, index) => ({
      id: `${index}-${file.name}`, // Asignar un id único a cada archivo
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

    console.log('drag end');
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={pdfs} strategy={horizontalListSortingStrategy}>
        <Grid container spacing={4} sx={{ padding: '10px' }}>
          {pdfs.map((pdf) => (
            <PdfItem key={pdf.id} id={pdf.id} content={pdf.file} />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
}

export default PdfList;
