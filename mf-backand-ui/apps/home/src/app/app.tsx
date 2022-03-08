// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Suspense } from 'react';
const UsersEntry = React.lazy(() => import('users/UsersEntry'));
const BlogEntry = React.lazy(() => import('blog/BlogEntry'));
const ProductsEntry = React.lazy(() => import('products/ProductsEntry'));

import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

export function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
