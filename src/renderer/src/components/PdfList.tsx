import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PdfItem from './PdfItem';

function PdfList(): JSX.Element {
  const [pdfs, setPdfs] = useState([
    { id: 1, item: 'John' },
    { id: 2, item: 'Sarah' },
    { id: 3, item: 'Paul' }
  ]);

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
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <h1 className="text-2xl font-bold">Users List</h1>
          <SortableContext items={pdfs} strategy={verticalListSortingStrategy}>
            {pdfs.map((pdf) => (
              <PdfItem key={pdf.id} item={pdf.item} id={pdf.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default PdfList;
