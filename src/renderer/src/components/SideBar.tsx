import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from '@mui/material';
import { useState } from 'react';
import TaskIcon from '@mui/icons-material/Task';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function SideBar(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  const handleListItemClick = (index: number, path: string): void => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          backgroundColor: '#1f2124',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1f2124',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack alignItems="center">
            <Typography sx={{ fontSize: 30, color: (theme) => theme.palette.primary.main }}>
              <b>Docsor</b>
            </Typography>
          </Stack>
        </Toolbar>
        <Divider />
        <List sx={{ padding: '10px' }}>
          {[
            { text: 'Archivos Recientes', icon: 'AccessTimeFilledIcon', path: '/recents' },
            { text: 'Herramientas', icon: 'TaskIcon', path: '/tools' },
            { text: 'Configuraciones', icon: 'SettingsIcon', path: '/settings' },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={(): void => handleListItemClick(index, item.path)}
                sx={{
                  height: 48,
                  position: 'relative',
                  textTransform: 'capitalize',
                  color: 'text.secondary',
                  borderRadius: '10px',
                  transition: 'background-color 0.4s ease-out',
                  '&.active': {
                    color: 'white',
                    bgcolor: 'white',
                    fontWeight: 'fontWeightBold',
                    backgroundColor: '#18a586',
                    padding: '10px',
                  },
                }}
                className={index === activeIndex ? 'active' : ''}
              >
                <ListItemIcon sx={{ color: 'white' }}>{getIcon(item.icon)}</ListItemIcon>
                <ListItemText sx={{ color: 'white' }} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

function getIcon(name: string): JSX.Element {
  switch (name) {
    case 'TaskIcon':
      return <TaskIcon />;
    case 'UploadFileIcon':
      return <UploadFileIcon />;
    case 'SettingsIcon':
      return <SettingsIcon />;
    case 'AccessTimeFilledIcon':
      return <AccessTimeFilledIcon />;
    default:
      return <div>Icon not found</div>;
  }
}
