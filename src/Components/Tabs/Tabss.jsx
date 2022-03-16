import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';


function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}



function Tabss() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value)
  };

  return (
    // <Box sx={{ width: '100%' }}>
    //   <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
    //     <Tab component={Link} to="/restaurants" label="Restaurants" />
    //     <Tab component={Link} to="/myrestaurants" label="List"/>
    //   </Tabs>
    // </Box>

    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
    <Tabs value={value} onChange={handleChange} centered>
      <Tab label="Item One" />
      <Tab label="Item Two" />
      {/* <Tab label="Item Three" /> */}
    </Tabs>
  </Box>
  )
}

export default Tabss