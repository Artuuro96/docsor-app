import { Card, CardContent, Typography, styled } from '@mui/material';
import { images } from '../assets/index';
interface CardOptionProps {
  title: string;
  description: string;
  icon: string;
}

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

function CardOption({ title, description, icon }: CardOptionProps): JSX.Element {
  return (
    <>
      <HoverCard>
        <Card>
          <CardContent
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: 30 }} gutterBottom>
              <b>{title}</b>
            </Typography>
            <img width={50} height={50} src={images[icon]} alt="image" />
            <Typography variant="body2">
              <b>{description}</b>
            </Typography>
          </CardContent>
        </Card>
      </HoverCard>
    </>
  );
}

export default CardOption;
