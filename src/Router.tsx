import { createBrowserRouter, useMatch, useParams } from 'react-router';
import { HomePage } from './pages/Home.page';
import { PackBuilder } from './pages/PackBuilder.page';
import { Layout } from '@/components/Layout/Layout';
import { PackList } from './pages/PackList.page';
import { useAppStore } from './Store/store';
import { useEffect } from 'react';

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
        element: <PackList />,
      },
      {
        path: '/packs/new',
        Component: (() => {
          const clear = useAppStore((state) => state.clearBuilder)
          const setPackId = useAppStore((state) => state.setPackId)
          
          useEffect(() => {
            clear()
            setPackId(undefined)
          })
          return (
            <PackBuilder />
          )
        }),
      },
      {
        path: '/packs/:id/edit',
        Component: (() => {
          const editPack = useAppStore((state) => state.editPack)
          const { id } = useParams()

          useEffect(() => {
            if (id) { editPack(id) }
          })

          return (
            <PackBuilder />
          )
        }),
      },
    ],
  },
]);

