import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useMounted } from '../../hooks/use-mounted';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function LoginModal({ open, handleClose }) {

  const isMounted = useMounted();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    password: ''
  });
  const { issuer, signIn } = useAuth();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changeUserInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
  const onSubmit = async () => {
    await signIn(userInfo.name, userInfo.password);
    if (isMounted()) {
      handleClose()
      router.push('/')
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="290"
          image="/signup.png"
        />
        <CardContent>
          <FormControl style={{ width: '100%', marginBottom: 20 }}>
            <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type={'text'}
              autoComplete="off"
              value={userInfo.name}
              onChange={changeUserInfo}
              name="name"
            />
          </FormControl>
          <FormControl style={{ width: '100%', marginBottom: 20 }}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={userInfo.password}
              onChange={changeUserInfo}
            />
          </FormControl>
            <Button style={{ marginRight: 10}} size="small" color='success' variant="contained" startIcon={<LoginIcon />} onClick={onSubmit}>Login</Button>
            <Button size="small" color='error' variant="contained" startIcon={<CloseIcon />} onClick={() => handleClose()}>Cancel</Button>
        </CardContent>
      </Card>
    </Modal>
  );
}