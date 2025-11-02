import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage'
import HotelDetailPage from './components/HotelDetailPage';
import UserProfilePage from './components/UserProfilePage';
import AdminPage from './components/AdminPage';
import RoomPage from './components/RoomPage';
import ProfilePage from './components/ProfilePage';
import ReservationPage from './components/ReservationPage';
import Testing from './components/Testing'

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path='/' element={<ReservationPage/>}/>
        <Route path='/hotel-details/:hotelId' element={<HotelDetailPage/>}/>
        <Route path='/sign-page' element={<SignInPage/>}/>
        <Route path='/user-profile' element={<UserProfilePage/>}/>
        <Route path='/admin-page' element={<AdminPage/>}/>
        <Route path='/room-service/:hotelId/:hotelName' element={<RoomPage/>}/>
        <Route path='/profile-dashboard' element={<ProfilePage/>}/>
        <Route path='/reservation-path/:roomNumber/:hotelName/:perNightCost' element={<ReservationPage />}/>
      </Routes>
    </Router>
  );

}

export default App
