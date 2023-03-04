import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { authApi } from '../../api/auth';
import Alert from '../../components/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignupModal({ open, handleClose }) {

  const [newUser, setNewUser] = useState({
    name: '',
    password: '',
    confirm_pwd: '',
    gender: 'other',
    email: '',
    location: '',
    avatar: 1,
    real_name: ''
  });
  const [error, setError] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    msg: ''
  });

  const editNewUserInfo = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
    onError(e.target.name, e.target.value)
  }
  const onError = (field, value) => {
    value = value.toString();
    if (field === 'email') {
      if (value.indexOf('@') === -1 || 
        value.indexOf('.') === -1 ||
        value === ''
      )
        setError({
          ...error,
          'email': 'Please input email address'
        })
      else setError({ ..._.omit(error, 'email')})
    }
    if (field === 'name') {
      if (value.length > 12)
        setError({
          ...error,
          'name': 'Player name must 12 characters max'
        })
      else if (value === '') {
        setError({
          ...error,
          'name': 'Please fill out the Player name'
        })
      }
      else setError({ ..._.omit(error, 'name')})
    }
    if (field === 'password') {
      if (value === '') {
        setError({
          ...error,
          'password': 'Please fill out the Password'
        })
      }
      else setError({ ..._.omit(error, 'password')})
    }
    if (field === 'confirm_pwd') {
      if (value === '') {
        setError({
          ...error,
          'password': 'Please fill out the Confrim Password'
        })
      }
      else if (value !== newUser.password) {
        setError({
          ...error,
          'confirm_pwd': 'Did not match with Password'
        })
      }
      else setError({ ..._.omit(error, 'confirm_pwd')})
    }
  }
  const onSubmit = async () => {
    if (Object.keys(error).length == 0) {
      const data = await authApi.signUp(newUser);
      if (data.success) {
        setMessage({
          type: 'success',
          msg: 'Created new account successfully!'
        });
        // handleClose();
      } else {
        setMessage({
          type: 'error',
          msg: data.msg
        });
      }
      setOpenAlert(true);
    }
  }
  const closeAlertHandler = () => {
    setMessage({
      type: '',
      msg: ''
    });
    setOpenAlert(false);
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <PersonAddAltIcon />
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Signup
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} >
        <Grid item md={4}>
          <Image width={300} height={700} src={'/signup1.png'} style={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item md={8} style={{ paddingTop: 30, paddingRight: 20 }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Player Name*</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{
                  width: '100%'
                }}
                value={newUser.name}
                onChange={editNewUserInfo}
                name="name"
                variant="outlined"
                size='small'
                helperText={error?.name ? error?.name : "This is your login/screen name (12 characters max). It may include letters, numbers, dashes, and underscores."}
                error={error?.name ? true : false }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Password*</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{
                  width: '100%'
                }}
                variant="outlined"
                size='small'
                helperText={ error?.password ? error?.password : "Longer passwords offer better security" }
                type={'password'}
                value={newUser.password}
                onChange={editNewUserInfo}
                name="password"
                error={error?.password ? true : false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Confirm Password*</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{
                  width: '100%'
                }}
                variant="outlined"
                size='small'
                type={'password'}
                value={newUser.confirm_pwd}
                onChange={editNewUserInfo}
                name="confirm_pwd"
                error={ error?.confirm_pwd ? true : false }
                helperText={ error?.confirm_pwd ? error?.confirm_pwd : '' }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item md={4}>
              <Typography>Email address*</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{
                  width: '100%'
                }}
                variant="outlined"
                size='small'
                helperText={error?.email ? error?.email : "Your email address is used for account validation and password recovery. It is not displayed to the other players."}
                value={newUser.email}
                onChange={editNewUserInfo}
                name="email"
                error={error?.email ? true : false }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Real name</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{
                  width: '100%'
                }}
                variant="outlined"
                size='small'
                helperText="This is an optional field to specify your real nae, up to 50 characters."
                value={newUser.real_name}
                onChange={editNewUserInfo}
                name="real_name"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Location</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{
                  width: '100%'
                }}
                variant="outlined"
                size='small'
                helperText="This is an optional field to specify your location (city, country, etc), up to 50 characters."
                value={newUser.location}
                onChange={editNewUserInfo}
                name="location"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography>Gender</Typography>
            </Grid>
            <Grid item md={8}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                defaultValue={'other'}
                value={newUser.gender}
                onChange={editNewUserInfo}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4}>
            </Grid>
            <Grid item md={8}>
              <Button color="success" variant="outlined" style={{ width: '100%', marginTop: 10 }} size="small" onClick={onSubmit}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Alert open={openAlert} handleClose={closeAlertHandler} msg={message.msg} type={message.type}/>
    </Dialog>
  );
}