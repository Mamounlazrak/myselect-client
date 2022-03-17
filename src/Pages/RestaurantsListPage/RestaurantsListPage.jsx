import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import AddFormRestaurant from '../../Components/AddFormRestaurant/AddFormRestaurant';
import service from "../../api/service";
import RestaurantCard from '../../Components/RestaurantCard/RestaurantCard';
import { Box } from '@mui/system';
import Tabss from '../../Components/Tabs/Tabss';
import Button from '@mui/material/Button';




function RestaurantsListPage({children}) {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants`)
            setRestaurants(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchRestaurants();

    }, []);
    

  return (
    <>
    {children}
    
    <Box sx = {{
        paddingLeft: 9,
        paddingRight: 9,
        paddingTop: 2,
        // height: '100vh',
        // backgroundColor:'#f0f2f5',
        marginTop: '7vh'
    }}>
          {/* <Tabss></Tabss> */}
        <Box sx = {{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center'

        }}>

          <Box component="h3" sx = {{textAlign: 'left', marginBottom: '0', marginTop: '0'}}>Restaurants in Lisbon</Box>
          {(loggedIn && user.isAdmin) && <Box>
            <Button size ="small" variant="outlined" component={Link} to="/addrestaurant">Add</Button>
          </Box>
          }

        </Box>
        {restaurants.map((restaurant) => {
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

export default RestaurantsListPage