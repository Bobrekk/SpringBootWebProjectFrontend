import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import User from './Components/User/User'
import Auth from './Components/Auth/Auth'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route exact path='/' Component={Home}></Route>
          <Route exact path='/users/:userId' Component={User}></Route>
          <Route exact path='/auth' element={localStorage.getItem('currentUser') != null ? <Navigate to="/"/> : <Auth/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
