import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage';
import MyRestaurantsListPage from './Pages/MyRestaurantsListPage/MyRestaurantsListPage';
import IsPrivate from './Components/IsPrivate/IsPrivate';
import IsAnon from './Components/IsAnon/IsAnon';
import RestaurantEditPage from './Pages/RestaurantEditPage/RestaurantEditPage';
import NavBarMUI from './Components/NavBarMUI/NavBarMUI';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import HomePage from './Pages/HomePage/HomePage';
import RestaurantsListPageMui from './Pages/RestaurantsListPageMui/RestaurantsListPageMui'
import RestaurantsCreatePage from './Pages/RestaurantsCreatePage/RestaurantsCreatePage';


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage> <Navbar /> </HomePage>}/>
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>}/>
        <Route path="/restaurants" element={<RestaurantsListPage> <Navbar /> </RestaurantsListPage>}/>
        <Route path="/myrestaurants" element={<IsPrivate> <MyRestaurantsListPage> <Navbar /> </MyRestaurantsListPage> </IsPrivate>} /> 
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage> <Navbar /> </RestaurantDetailsPage>} />
        <Route path="/edit/:restaurantId" element={<RestaurantEditPage> <Navbar /> </RestaurantEditPage>} />
        <Route path="/profile" element={<IsPrivate><ProfilePage> <Navbar /> </ProfilePage></IsPrivate>} />
        <Route path="/addrestaurant" element={<RestaurantsCreatePage> <Navbar /> </RestaurantsCreatePage>}/>
      </Routes>
      <NavBarMUI></NavBarMUI>
    </div>
  );
}

export default App;
