import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import { useAppSelector } from 'libs/hooks';

function PageHeader() {
  const {  user, userRoles, userPermissions } = useAppSelector(
    (state) => state.authReducer
  );

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Users 
        </Typography>
        <Typography variant="subtitle2">
          Hello {user.first_name}, 
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create user
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
