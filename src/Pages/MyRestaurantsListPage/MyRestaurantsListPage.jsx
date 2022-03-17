import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import Tabss from '../../Components/Tabs/Tabss';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import RestaurantCard from '../../Components/RestaurantCard/RestaurantCard';






function MyRestaurantsListPage({children}) {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [myRestaurants, setMyRestaurants] = useState([]);

    const fetchMyRestaurants = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myrestaurants/${user._id}`)
            setMyRestaurants(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    

    useEffect(() => {
        fetchMyRestaurants();
    }, []);
    


  return (
    <>
    {children}

    <Box sx = {{
      paddingLeft: 9,
      paddingRight: 9,
      paddingTop: 2,
      height: '100vh',
      marginTop: '7vh'
  }}>
        {/* <Tabss></Tabss> */}
      <Box sx = {{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center'

      }}>

        <Box component="h3" sx = {{textAlign: 'left', marginBottom: '0', marginTop: '0'}}>My List</Box>
        {(loggedIn && user.isAdmin) && <Box>
          <Button size ="small" variant="outlined" component={Link} to="/addrestaurant">Add restaurant</Button>
        </Box>
        }

      </Box>
      {myRestaurants.map((restaurant) => {
      return (
        <div key={restaurant._id}>
          <RestaurantCard restaurant={restaurant}></RestaurantCard>

        </div>
      );
    })}



  </Box>
  </>
  )
}

export default MyRestaurantsListPage