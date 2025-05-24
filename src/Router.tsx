import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/Home.page';
import { Packs } from './pages/Packs.page';
import { Layout } from './Layout/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/packs',
        element: <Packs />,
      },
    ],
  },
]);

