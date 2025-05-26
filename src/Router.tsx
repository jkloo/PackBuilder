import { createBrowserRouter, useMatch, useParams, useSearchParams } from 'react-router';
import { HomePage } from './pages/Home.page';
import { PackBuilder } from './pages/PackBuilder.page';
import { Layout } from '@/components/Layout/Layout';
import { PackList } from './pages/PackList.page';
import { useAppStore } from './Store/store';
import { useEffect } from 'react';
import { PackDetail } from './pages/PackDetail.page';

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
        Component: (() => {
          const packs = useAppStore((state) => state.packDatabase)
          return (
            <PackList packs={packs.values().toArray()}/>
          )
        }),
      },

      {
        path: '/boxes/:boxId',
        Component: (() => {
          const { boxId } = useParams()
          const packs = useAppStore((state) => state.packDatabase)
          return (
            <PackList boxId={boxId} packs={packs.values().filter((p) => (p.boxId == boxId)).toArray()}/>
          )
        }),
      },
      {
        path: '/packs/new',
        Component: (() => {
          const clear = useAppStore((state) => state.clearBuilder)
          const setPackId = useAppStore((state) => state.setPackId)
          const setBoxId = useAppStore((state) => state.setBoxId)

          const [params] = useSearchParams()

          const boxId = params.get('boxId')
          
          useEffect(() => {
            clear(false)
            setPackId(undefined)
            if (!!boxId) { setBoxId(boxId) }
          })
          return (
            <PackBuilder />
          )
        }),
      },
      {
        path: '/packs/:id',
        Component: (() => {
          const packs = useAppStore((state) => state.packDatabase)
          const { id } = useParams()

          return (
            <PackDetail pack={packs.get(id!)!} />
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

