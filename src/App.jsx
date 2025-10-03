import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './components/SignInPage';

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path='/' element={<SignInPage/>}/>
      </Routes>
    </Router>
  );

}

export default App
