import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';



function RestaurantCard(props) {
  return (
    <Card sx={{ 
        maxWidth: 345,
        display: 'flex',
        // justifyContent: 'center',
        margin: 'auto',
        marginTop: 2,
        marginBottom: 2

     }}>
      <CardActionArea component={Link} to={`/restaurants/${props.restaurant._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={props.restaurant.imageURL}
          alt="restaurant image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.restaurant.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default RestaurantCard