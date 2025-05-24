import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {  RouterProvider } from 'react-router';
import { router } from '@/Router';

export default function App() {

  return (
    <React.StrictMode>
    <MantineProvider theme={theme}>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <RouterProvider router={router} />
    </ErrorBoundary>
    </MantineProvider>
    </React.StrictMode>
  );
}
