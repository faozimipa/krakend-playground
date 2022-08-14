import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, Checkbox, Container, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import Footer from 'apps/home/src/app/components/Footer';
import PageTitleWrapper from 'apps/home/src/app/components/PageTitleWrapper';
import { useAppDispatch, useAppSelector } from 'libs/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { getAll, selectState, setLoading } from './UsersPermissionsSlice';


import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import ZiLoading from 'libs/components/ZiLoading';
import { LoadingButton } from '@mui/lab';
import UsersService from '../../UsersService';
import { Permission } from '../../models/Permissions';
import { Role } from '../../models/Role';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { UserStatus } from '../../models/User';

function PermissionsContent() {
  const data = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getAll());
  }, []);

  const theme = useTheme();
  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [newPermissionName, setNewPermissionName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLoading, setNewLoading] = useState(false);
  const [titleFormText, setTitleFormText] = useState('Add Permission');
  const [submitText, setSubmitText] = useState('Create');
  const [actionID, setActionID] = useState('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPermissionName(event.target.value);
  };

  const handleChangeDecs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const handleAdd = () => {
    setIsShowFormAdd(true);
  };


  const resetNew = async () => {
    setIsShowFormAdd(false);
    setActionID('');
    setNewPermissionName('');
    setNewDescription('');
    setNewLoading(false);
    setSubmitText('Create');
    setTitleFormText('Add Permission');
  };

  const submit = async () => {
    setNewLoading(true);
    const data = {
      id: actionID.toString(),
      name: newPermissionName,
      description: newDescription,
    };

    try {
      let save;
      if (actionID == '') {
        save = await UsersService.addPermission(data);
      } else {
        // save = await UsersService.editPermission(data);
      }

      console.log(save);
      resetNew();
      dispatch(getAll());
    } catch (error: any) {
      console.log(error);
      setNewLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Management - Permissions</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              List Permissions
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleAdd}
            >
              Create Permission
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
                <CardHeader title={titleFormText}></CardHeader>
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
                        label="Permission Name"
                        value={newPermissionName}
                        onChange={handleChangeName}
                      />
                      <TextField
                        id="outlined-description"
                        label="Description"
                        multiline
                        rows={4}
                        value={newDescription}
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
                        onClick={resetNew}
                        variant="contained"
                        sx={{ margin: 1 }}
                      >
                        Cancel
                      </Button>
                      <LoadingButton
                        size="small"
                        color="secondary"
                        onClick={submit}
                        loading={newLoading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        sx={{ margin: 1 }}
                      >
                        {submitText}
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
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onChange={()=>{}}
                        />
                      </TableCell>
                      <TableCell>Permission Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.permissions.map((p:Permission) => {
                      // const isUserSelected = selectedUsers.includes(user.id);
                      return (
                        <TableRow hover key={p.ID}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {p.Name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              what is this
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {p.Description}
                            </Typography>
                          </TableCell>
                          
                  
                         
                          <TableCell align="right">
                            <Tooltip title="Edit User" arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.primary.lighter,
                                  },
                                  color: theme.palette.primary.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton
                                sx={{
                                  '&:hover': { background: theme.colors.error.lighter },
                                  color: theme.palette.error.main,
                                }}
                                color="inherit"
                                size="small"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default PermissionsContent;
