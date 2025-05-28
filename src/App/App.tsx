import '@mantine/core/styles.css';
import React from 'react';

import { MantineProvider } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';
import { router } from '@/Router';
import { Notifications } from '@mantine/notifications';

import { theme } from '@/theme';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';


export default function App() {

  return (
    <React.StrictMode>
    <MantineProvider theme={theme}>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Notifications />
    <RouterProvider router={router} />
    </ErrorBoundary>
    </MantineProvider>
    </React.StrictMode>
  );
}
