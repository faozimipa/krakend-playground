// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UsersEntry from './pages/data/UsersEntry';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from 'apps/home/src/app/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

export function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <UsersEntry></UsersEntry>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
