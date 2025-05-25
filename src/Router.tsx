import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/Home.page';
import { PackBuilder } from './pages/PackBuilder.page';
import { Layout } from '@/components/Layout/Layout';

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
        element: <PackBuilder />,
      },
    ],
  },
]);

