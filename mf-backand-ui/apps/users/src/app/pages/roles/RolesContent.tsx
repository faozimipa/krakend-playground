import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Footer from 'apps/home/src/app/components/Footer';
import { Helmet } from 'react-helmet-async';
import ZiLoading from 'libs/components/ZiLoading';
import { useAppSelector, useAppDispatch } from 'libs/hooks';
import { getAll, selectState, setLoading } from './UsersRolesSlice';
import { useEffect, useState } from 'react';
import PageTitleWrapper from 'apps/home/src/app/components/PageTitleWrapper';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Role } from '../../models/Role';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import UsersService from '../../UsersService';

function RolesContent() {
  const data = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading());
    dispatch(getAll());
  }, []);

  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [newLoading, setNewLoading] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoleName(event.target.value);
  };

  const handleChangeDecs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoleDescription(event.target.value);
  };

  const handleAdd = () => {
    setIsShowFormAdd(true);
  };

  const resetNewRole = async () => {
    setIsShowFormAdd(false);
    setNewRoleName('');
    setNewRoleDescription('');
    setNewLoading(false);
  };

  const submitNewRole = async () => {
    setNewLoading(true);
    var data = { name: newRoleName, description: newRoleDescription };

    try {
      const save = await UsersService.addRole(data);
      console.log(save);
      resetNewRole();
      dispatch(getAll());
    } catch (error: any) {
      console.log(error);
      setNewLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Management - Roles</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              List Roles
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleAdd}
            >
              Create Role
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
           {data.isLoading && <ZiLoading />}
           {isShowFormAdd && (
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Add role"></CardHeader>
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-name"
                          label="Role Name"
                          value={newRoleName}
                          onChange={handleChangeName}
                        />
                        <TextField
                          id="outlined-description"
                          label="Description"
                          multiline
                          rows={4}
                          value={newRoleDescription}
                          onChange={handleChangeDecs}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          padding: '10px',
                          flexDirection: 'row',
                        }}
                      >
                        <Button
                          size="small"
                          color="warning"
                          onClick={resetNewRole}
                          variant="contained"
                          sx={{ margin: 1 }}
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          size="small"
                          color="secondary"
                          onClick={submitNewRole}
                          loading={newLoading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"
                          sx={{ margin: 1 }}
                        >
                          Save
                        </LoadingButton>
                      </Box>
                    </Box>
                  </CardContent>
                  <Divider />
                </Card>
              </Grid>  
              )}

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Data"></CardHeader>
              <Divider />
              <CardContent sx={{ paddingTop: '20px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    padding: '10 px',
                    flexDirection: 'row',
                  }}
                >
                  {data.roles.map((role: Role) => {
                    return (
                      <Grid container justifyContent="center" spacing={3}>
                        <Card sx={{ maxWidth: 145 }}>
                          <CardActionArea>
                            <CardMedia></CardMedia>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h3"
                                component="div"
                              >
                                {role.Name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {role.Description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default RolesContent;
