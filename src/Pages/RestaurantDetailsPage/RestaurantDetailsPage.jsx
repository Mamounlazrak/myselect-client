import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Map from '../../Components/Map/Map';




function RestaurantDetailsPage({children}) {

   

 
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const { loggedIn, user, logoutUser, authenticateUser } = useContext(AuthContext);
    const [myRestaurants, setMyRestaurants] = useState(null);

    const navigate = useNavigate();

    const fetchMyRestaurants = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myrestaurants/no-populate/${user._id}`);
            setMyRestaurants(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const fetchRestaurant = async () => {
        try{
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            setRestaurant(response.data);
        } catch (error) {
            console.log(error);
        }
    };




    const addToMyList = () => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/myrestaurants/${user._id}/${restaurantId}`)
            .then((newList) => {
                 fetchMyRestaurants()})
            .catch((err) => console.log(err));
    }


    const deleteRestaurant = () => {

        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            .then((deleted) => {
                 navigate('/restaurants')})
            .catch((err) => console.log(err));
    }


    useEffect( () => {fetchRestaurant();
        fetchMyRestaurants()
    }, [user]);


  return (
      <>
        {children}
      
    <Box sx={{
        paddingLeft: 9,
        paddingRight: 9,
        marginTop: '9vh'
    }}>
        {restaurant && 
        <>
            <Box sx = {{
          display: 'flex',
          justifyContent:'space-between',
          paddingBottom: 0
            }}>
                <Box component="h3" sx = {{marginTop: 0, marginBottom:0}}>{restaurant.name}</Box>
                {(loggedIn && user.isAdmin) &&
                <Box>
                    <Button size ="small" variant="outlined" component={Link} to={`/edit/${restaurantId}`}>Edit</Button>
                </Box>
                }
            </Box>

            <Box sx = {{margin: 0, textAlign: 'left'}}>Average Price: {restaurant.averagePrice}€</Box>
            <Box sx = {{margin: 0, textAlign: 'left'}}>Location: {restaurant.location}</Box>

            <CardMedia
                component="img"
                height="240"
                image={restaurant.imageURL}
                alt="restaurant image"

                sx = {{marginTop: 2, marginBottom: 2}}
            />
            <Box component="h4" sx={{margin: 0, textAlign: 'left'}}>About</Box>
            <Box component="p" sx={{margin: 0, textAlign: 'left'}}>{restaurant.description}</Box>
            
            <Box component="h4" sx={{margin: 0, textAlign: 'left', marginTop: 2, marginBottom: 1}}>Map location</Box>
            
            <Box sx = {{width: '60vw'}} component={Map} marker = {restaurant.locationGPS.coordinates}></Box>
 


        {(loggedIn && !user.isAdmin) &&
            <>
        { (loggedIn && myRestaurants) && myRestaurants.includes(restaurantId) ? 
        <Box sx = {{textAlign: 'left'}}>
        <Button variant="contained" onClick={() => addToMyList()} sx={{textAlign:'left', marginTop: 2, marginBottom: 2}}>Remove from my list</Button> 
        </Box>
        :
        <Box sx = {{textAlign: 'left'}}>
        <Button variant="contained" onClick={() => addToMyList()} sx={{textAlign:'left', marginTop: 2, marginBottom: 2}}>Add to my list</Button> 
        </Box>
        }
            </> 
        }



        {(loggedIn && user.isAdmin) &&
            <>
                <Box sx = {{textAlign: 'left', marginTop:'2ch', marginBottom:'2ch'}}>
                    <Button type='submit' variant='contained' onClick={() => deleteRestaurant()}>Remove restaurant</Button>
                </Box>
            </>
        }

        
        </>  
        
        }
    </Box>
    </>
  )




}

export default RestaurantDetailsPage