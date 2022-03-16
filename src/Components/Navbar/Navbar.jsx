import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';




function Navbar() {
  const { loggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <Box sx = {{
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 1,
      // paddingBottom: 1,
      marginBottom: 1,
      height: '10vh',
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
        
      {(loggedIn && user.isAdmin) && <Box>Admin View</Box> }
    </Box>
  );
}

export default Navbar;