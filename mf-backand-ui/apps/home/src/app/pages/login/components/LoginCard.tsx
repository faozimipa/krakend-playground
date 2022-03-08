import { ChangeEvent, MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { useAppSelector, useAppDispatch } from 'libs/hooks';
import { Credential, login, selectState, setLoading } from '../UserSlice';

import { Alert, Snackbar } from '@mui/material';
import { Navigate } from 'react-router-dom';
type State = {
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function LoginCard() {
  interface CredentialState {
    username: string;
    password: string;
    weight: string;
    weightRange: string;
    isShowPassword: boolean;
  }
  const [values, setValues] = useState<CredentialState>({
    username: '',
    password: '',
    weight: '',
    weightRange: '',
    isShowPassword: false,
  });

  const handleChange =
    (prop: keyof CredentialState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      isShowPassword: !values.isShowPassword,
    });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const data = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  const doLogin = async () => {
    let cred: Credential = {
      email: values.username,
      password: values.password,
    };
    await dispatch(setLoading);
    await dispatch(login(cred));
    if (data.error) {
      setIsOpen(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  if (1 == 1) {
    <Navigate to="/dashboards/crypto" replace />;
  }
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {data.isLoggedIn?
      <Navigate to="/dashboards/crypto" replace />  
    :
      <Grid item xs={3}>
        <Card sx={{ minWidth: 225 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day 
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-username">
                  Username
                </InputLabel>
                <Input
                  id="standard-adornment-username"
                  value={values.username}
                  onChange={handleChange('username')}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />

              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>

                <Input
                  id="standard-adornment-password"
                  type={values.isShowPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.isShowPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={() => doLogin()}>
              Login
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          onClose={() => {
            setIsOpen(false);
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message={data.error}
        >
          <Alert severity="warning" sx={{ width: '100%' }}>
            {data.error}
          </Alert>
        </Snackbar>
      </Grid>
}
    </Grid>
  );
}
