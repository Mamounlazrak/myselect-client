import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/system';
import RestaurantCard from '../../Components/RestaurantCard/RestaurantCard';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';





function HomePage({children}) {

    const [restaurantOfTheWeek, setRestaurantOfTheWeek] = useState(null);

    const getRestaurantOfTheWeek = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/restaurant-of-the-week`)
        .then((restaurant) => {setRestaurantOfTheWeek(restaurant.data); console.log(restaurant.data)})
        .catch((err) => console.log(err))
    }

    useEffect(() => getRestaurantOfTheWeek(), 
    [])
    
    const { loggedIn, user, logoutUser } = useContext(AuthContext);

  return (
      <>
      {children}
        <Box sx = {{
            // display: 'flex', 
            // flexDirection: 'column', 
            paddingLeft: 9,
            paddingRight: 9,
            paddingTop: 2,
            height: '100vh',
            marginTop: '7vh'
        }}>
        {!loggedIn &&
                <Box sx = {{
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '30vh', 
                    // paddingTop: '4vh'
                }}>
                    <Box component = "h3" sx = {{}}>Find sustainable restaurants and brands in Lisbon</Box>
                    <Box>
                        <Button size ="small" variant="contained" component={Link} to="/signup">Get started</Button>
                    </Box>
                </Box>
        }
        <Box sx = {{
                display: 'flex',
                justifyContent:'space-between',
                alignItems: 'center'
            }}>
                <Box component="h3" sx = {{textAlign: 'left', marginBottom: '0', marginTop: '0'}}>Restaurant of the week</Box>
                {(restaurantOfTheWeek && loggedIn && user.isAdmin) &&
                <Box>
                    <Button size ="small" variant="outlined" component={Link} to={`/edit/${restaurantOfTheWeek._id}`}>Edit</Button>
                </Box>
                }
            </Box>

            <Box sx = {{marginTop: 0, paddingTop: 0}}>
               {restaurantOfTheWeek && <RestaurantCard restaurant={restaurantOfTheWeek}></RestaurantCard>}
            </Box>
        </Box>
    </>
  )
}

export default HomePage
