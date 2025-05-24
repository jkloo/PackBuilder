import '@mantine/core/styles.css';
import React from 'react';

import { MantineProvider } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import {  RouterProvider } from 'react-router';
import { router } from '@/Router';

import { theme } from '@/theme';

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
