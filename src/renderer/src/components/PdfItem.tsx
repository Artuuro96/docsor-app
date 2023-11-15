import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@mui/material';

// eslint-disable-next-line react/prop-types

interface Pdf {
  id: number;
  item: string;
}
function PdfItem(pdf: Pdf): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition } =
    // eslint-disable-next-line react/prop-types
    useSortable({ id: pdf.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Card
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-md shadow-md my-2 text-slate-950"
    >
      <CardContent> {pdf.item} </CardContent>
    </Card>
  );
}

export default PdfItem;
