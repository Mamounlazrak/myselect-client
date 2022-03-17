import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';





function Navbar() {
  const { loggedIn, user, logoutUser } = useContext(AuthContext);
  return (
 
    <Box sx = {{
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 9,
      paddingRight: 9,
      paddingTop: 1,
      paddingBottom: 1,
      // marginBottom: 1,
      height: '6vh',
      borderBottom:'0.1px solid grey',
      position: 'fixed', top: 0, left: 0, right: 0, overflow: 'hidden', backgroundColor:'#f0f0f3', zIndex:'100'


    }}>

      <Box component={Link} to="/" sx = {{textDecoration: 'none', color:'black', fontWeight: 'bold'}}>
      myselect
      </Box>

      {!loggedIn && (
        <>
      <Box sx = {{display: 'flex', gap:'10%'}}>
        <Button size="small" variant="outlined" component={Link} to="/login">Login</Button>
        <Button size ="small" variant="contained" component={Link} to="/signup">Signup</Button>
      </Box>
        </>
      )}
        
      {(loggedIn && user.isAdmin) && <Box sx = {{fontWeight: 'bold', fontStyle: 'italic'}}>*Admin View</Box> }
    </Box>
  );
}

export default Navbar;