import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import service from "../../api/service";


function RestaurantEditPage({children}) {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [averagePrice, setAveragePrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

    const {restaurantId} = useParams();

    const navigate = useNavigate();

    const fetchRestaurant = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            let {name, location, averagePrice, description, imageURL} = response.data
            let latitude = response.data.locationGPS.coordinates[0];
            let longitude = response.data.locationGPS.coordinates[1];
            console.log(response.data);
            setName(name)
            setLocation(location)
            setLatitude(latitude);
            setLongitude(longitude);
            setAveragePrice(averagePrice)
            setDescription(description)
            setImageURL(imageURL)
        } catch(error) {
            console.log(error)
        }
    }

    const handleFileUpload = (e) => {
   
      const uploadData = new FormData();
   

      uploadData.append("imageUrl", e.target.files[0]);
   
      service
        .uploadImage(uploadData)
        .then(response => {
          console.log("response is: ", response);
          setImageURL(response.fileUrl);
          console.log(imageURL);

        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };


    useEffect(() => {
        fetchRestaurant()
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();

      const body = { name, location, latitude, longitude, averagePrice, description, imageURL };
  
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`, body)
        .then((response) => {
          console.log('RESPONSE',response);
          setName('');
          setLocation('');
          setLatitude('');
          setLongitude('');
          setAveragePrice(0);
          setDescription('');
          setImageURL('');
          if(response.data.ofTheWeek) {
            navigate(`/`);
          } else
          navigate(`/restaurants/${restaurantId}`);
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
    {children}

    <Box sx = {{             
      display:'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 9,
      paddingRight: 9,
      marginTop: '9vh'
      }}>
    
        <Box component="h3" sx = {{marginBottom: 1, marginTop: 0}}>
            Edit restaurant information
        </Box>  
        <Box 
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { maringTop: 2, marginBottom: 2, width: '70vw' }

            }}
            noValidate
            autoComplete="off">
            <div>
            <TextField
            label="Name"
            type="text"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <TextField
            fullWidth={true}
            label="Average Price"
            type="number"
            name='averagePrice'
            value={averagePrice}
            onChange={(e) => setAveragePrice(e.target.value)}
            />
            </div>
            <div>
            <TextField
            label="Location"
            type="text"
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            </div>

            <div>
            <TextField
            label="Latitude"
            type="text"
            name='latitude'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            />  
            </div>
            <div>
            <TextField
            label="Longitude"
            type="text"
            name='longitide'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            />
            </div>


            <div>
            <TextField
            label="Description"
            multiline={true}
            minRows="4"
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div>
    
            
            <Box sx = {{
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '1ch',
              marginBottom: '1ch'

          
            }}>
              <Box>
              <InputLabel>Change the picture</InputLabel>
              </Box>
              <Box>
              <Input
              disableUnderline={true}
              type="file"
              name='imageURL'
              onChange={(e) => handleFileUpload(e)}
              />
              </Box>
            </Box>

            
            
            </div>
          <Box sx = {{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '2vh',
            marginBottom: '4vh'
            
          }}>
            <Button variant='contained' type='submit'>Confirm changes</Button>
          </Box>
        </Box>
        
    
    
    </Box> 
</>
  )
}

export default RestaurantEditPage