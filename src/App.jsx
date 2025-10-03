import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage'
import HotelDetailPage from './components/HotelDetailPage';
import Testing from './components/Testing'

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/hotel-details/:hotelId' element={<HotelDetailPage/>}/>
      </Routes>
    </Router>
  );

}

export default App
