import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        console.log('res.data', response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    <Box component = {Paper} elevation = {3} sx = {{             
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 9,
      paddingRight: 9,
      paddingBottom: 6,
      marginTop: 6,
      marginLeft: 6,
      marginRight: 6,

      border:'1px solid grey'

      }}>
    
        <Box component="h3" sx = {{marginBottom: 2, marginTop: 4, display:'flex', marginLeft: 'auto', marginRight:'auto'}}>
            myselect
        </Box>

      <Box 
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { maringTop: 2, marginBottom: 2, width: '60vw' },
                marginTop: 2, 
                


            }}
            noValidate
            autoComplete="off">
            <div>
            <TextField
            label="Email"
            type="text"
            name='email'
            value={email}
            onChange={handleEmail}
            //   autoComplete="current-password"
            />
            </div>
            <div>
            <TextField
            label="Password"
            type="password"
            name='password'
            value={password}
            onChange={handlePassword}
            //   autoComplete="current-password"
            />
            </div>
          <Box sx = {{
            display: 'flex',
            justifyContent: 'flex-start',
            
          }}>
            <Button type='submit' variant='contained' sx = {{width:'60vw'}}>Login</Button>
          </Box>
        </Box>
        <Box component = {Link} to = '/reset-password' sx = {{textDecoration: 'none', marginTop: 2}}>
            Forgotten your password? 
        </Box>
      </Box>
      <Box component = {Paper} elevation = {3} sx = {{             
      display:'flex',
      justifyContent: 'center',
      paddingLeft: 4,
      paddingRight: 4,
      paddingBottom: 2,
      paddingTop: 2,
      marginTop: 4,
      marginLeft: 6,
      marginRight: 6,
      border:'1px solid grey'
      }}>
      <>
       <Box sx = {{display:'flex'}}>
         <Box component = "p" sx = {{display:'flex', margin: 'auto'}}>Don't have an account? </Box> 
         <Box component = {Link} to ='/signup' sx = {{display: 'flex', textDecoration:'none', marginLeft: 0.5}}>Signup</Box>
       </Box>
       </>


      </Box>

      </>

  );
}

export default LoginPage;