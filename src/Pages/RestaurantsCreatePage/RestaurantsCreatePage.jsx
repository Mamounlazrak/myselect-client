import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddFormRestaurant from '../../Components/AddFormRestaurant/AddFormRestaurant';


function RestaurantsCreatePage({children}) {
  return (
    <>
    {children}
    <div>
        <AddFormRestaurant />
    </div>
    </>
  )
}

export default RestaurantsCreatePage