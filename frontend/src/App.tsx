import React from 'react';
import './App.css';
import CustomizePage from './pages/CustomizePage';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import Register from './pages/RegisterPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/UserContext'; // <--- 🔑 NEW IMPORT

const App: React.FC = () => {
  return (
    // 1. Wrap the entire application with the UserProvider
    <AuthProvider> 
      <Router>  
        <div className="App">
          {/* 2. The Navbar component should be placed here (outside <Routes>) 
               so it appears on every page.
          */}
          {/* <Navbar /> */} 

          <Routes>
            {/* These pages will now have access to the user context */}
            <Route path="/login" element={<Login />}/> 
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage/>}/>
            <Route path="/customize" element={<CustomizePage/>}/>
            <Route path='/products' element={<ProductsPage/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;