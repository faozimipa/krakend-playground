/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  withStyles,
} from '@mui/material';
import Footer from 'apps/home/src/app/components/Footer';
import { Helmet } from 'react-helmet-async';
import ZiLoading from 'libs/components/ZiLoading';
import { useAppSelector, useAppDispatch } from 'libs/hooks';
import {
  getAll,
  rolesSelectState,
  setLoading,
  stopLoading,
} from './UsersRolesSlice';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import PageTitleWrapper from 'apps/home/src/app/components/PageTitleWrapper';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Role } from '../../models/Role';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import UsersService from '../../UsersService';
import { Permission } from '../../models/Permissions';
import styled from '@mui/styles/styled';
import { useNavigate } from "react-router-dom";


function RolesContent() {
  const data = useAppSelector(rolesSelectState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLoading());
    dispatch(getAll());
  }, []);

  const [isShowFormAdd, setIsShowFormAdd] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [newLoading, setNewLoading] = useState(false);
  const [titleFormText, setTitleFormText] = useState('Add Role');
  const [submitText, setSubmitText] = useState('Create');
  const [actionID, setActionID] = useState('');

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
    setActionID('');
    setNewRoleName('');
    setNewRoleDescription('');
    setNewLoading(false);
    setSubmitText('Create');
    setTitleFormText('Add role');
  };

  const [expanded, setExpanded] = useState<string | false>(false);
  const [permissionsRoleList, setPermissionsRoleList] = useState<string[]>([]);

  const handleChange =
    (panel: string) => async (event: SyntheticEvent, isExpanded: boolean) => {
      dispatch(setLoading());
      try {
        await UsersService.getPermissionsByRoleName(panel).then((response) => {
          if (response) {
            if (response.status == 'success' && response.data) {
              setPermissionsRoleList(response.data);
            } else {
              setPermissionsRoleList([]);
            }
          }
          dispatch(stopLoading());
        });
      } catch (error: any) {
        console.log(error);
        setPermissionsRoleList([]);
        dispatch(stopLoading());
      }

      setExpanded(isExpanded ? panel : false);
    };

  const handleChangeCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    //roleName
    console.log(event.target.value);
    //permissionName
    console.log(event.target.name);
    const permissionName = event.target.name;
    let data: string[] = [];
    if (permissionsRoleList.includes(permissionName)) {
      data = permissionsRoleList.filter((val) => val != permissionName);
    } else {
      data = [...permissionsRoleList, event.target.name];
    }
    setPermissionsRoleList(data);
  };

  const checkPermission = (name: string) => {
    let result = false;
    if (permissionsRoleList.includes(name)) {
      result = true;
    }
    return result;
  };

  const submitNewRole = async () => {
    setNewLoading(true);
    const data = {
      id: actionID.toString(),
      name: newRoleName,
      description: newRoleDescription,
    };

    try {
      let save;
      if (actionID == '') {
        save = await UsersService.addRole(data);
      } else {
        save = await UsersService.editRole(data);
      }

      console.log(save);
      resetNewRole();
      dispatch(getAll());
    } catch (error: any) {
      console.log(error);
      setNewLoading(false);
    }
  };

  const editRole = async (role: Role) => {
    setIsShowFormAdd(true);
    setTitleFormText('Edit Role');
    setSubmitText('Save');
    setNewRoleName(role.Name);
    setNewRoleDescription(role.Description);
    setActionID(role.ID);
    await window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const saveRole = async (roleName: string) => {
    const data = {
      permissions: permissionsRoleList,
    };

    console.log(data);
    await dispatch(setLoading());

    try {
      await UsersService.syncRolePermissions(roleName, data).then(
        (response) => {
          if (response.status == 'success') {
            // dispatch(getAll());
          } else {
            // dispatch(getAll());
          }

          dispatch(stopLoading());
        }
      );
    } catch (error: any) {
      console.log(error);
      dispatch(stopLoading());
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
              <CardHeader title="Data"></CardHeader>
              <Divider />
              <CardContent sx={{ paddingTop: '20px' }}>
                {data.roles.map((role: Role) => {
                  return (
                    <div key={role.ID}>
                      <Accordion
                        expanded={expanded === role.Name}
                        onChange={handleChange(role.Name)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {role.Name}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {role.Description}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Permission</TableCell>
                                  <TableCell align="right">select</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.permissions.map((p: Permission) => (
                                  <TableRow
                                    key={p.Name}
                                    sx={{
                                      '&:last-child td, &:last-child th': {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {p.Name}
                                    </TableCell>
                                    <TableCell align="right">
                                      <Checkbox
                                        name={p.Name}
                                        value={role.Name}
                                        checked={checkPermission(p.Name)}
                                        onChange={handleChangeCheckbox}
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow
                                  key={'acction-' + role.ID}
                                  sx={{
                                    '&:last-child td, &:last-child th': {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                  ></TableCell>
                                  <TableCell align="right">
                                    <Stack spacing={2} direction="row" alignItems="right">
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                          navigate("/management/users/permissions");
                                        }}
                                      >
                                         Add Permission
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        onClick={() => {
                                          editRole(role);
                                        }}
                                      >
                                        Edit Role
                                      </Button>

                                      <Button
                                        variant="contained"
                                        onClick={() => {
                                          saveRole(role.Name);
                                        }}
                                      >
                                        Save
                                      </Button>
                                    </Stack>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  );
                })}
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
