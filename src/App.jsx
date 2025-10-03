import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './components/SignInPage';
import Testing from './components/Testing'

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
