import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import PageTitleWrapper from 'apps/home/src/app/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'apps/home/src/app/components/Footer';
import UsersDataContent from './content';

function UsersEntry() {
  return (
    <>
      <Helmet>
        <title>Management - Users</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
             <UsersDataContent></UsersDataContent>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}


export default UsersEntry;
