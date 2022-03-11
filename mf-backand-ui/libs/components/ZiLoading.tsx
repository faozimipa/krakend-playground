import { Box, CircularProgress, Dialog } from '@mui/material';

function ZiLoading() {
  return (
    <Box
      sx={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  );
}

export default ZiLoading;
