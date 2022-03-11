import { Container, Grid } from '@mui/material';
import Footer from 'apps/home/src/app/components/Footer';
import { Helmet } from 'react-helmet-async';

function PermissionsContent() {
  return (
    <>
      <Helmet>
        <title>Management - Permissions</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            Permissions page here
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default PermissionsContent;
