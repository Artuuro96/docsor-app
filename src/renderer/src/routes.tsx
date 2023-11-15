import { ReactNode } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import SideBar from './components/SideBar';
import ToolsPage from './components/ToolsPage';
import RecentsPage from './components/RecentsPage';
import SettingsPage from './components/SettingsPage';

export default function Router(): ReactNode {
  const routes: RouteObject[] = [
    {
      element: <SideBar />,
      path: '/',
      children: [
        {
          path: '/tools',
          element: <ToolsPage />,
        },
        {
          path: '/settings',
          element: <SettingsPage />,
        },
        {
          path: '/recents',
          element: <RecentsPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  const routesElement = useRoutes(routes);

  return routesElement;
}
