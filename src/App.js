//react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Authentication Firebase
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import './App.css';

//Import Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import CreatePost from './pages/CreatePost/CreatePost';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

//Import Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

//Import context
import { AuthProvider } from './context/AuthContext';
import Search from './pages/Search/Search';

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => { 

    onAuthStateChanged(auth, (user) => { 
      setUser(user);
    })

  }, [auth])

  if(loadingUser) { 
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar/>
            <div className="container">
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}></Route>
                <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}></Route>
                <Route path='/posts/create' element={ user ? <CreatePost/> : <Navigate to="/login"/>}></Route>
                <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to="/login"/>}></Route>
                <Route path='/search' element={user ? <Search/> : <Navigate to="/login"/>}></Route>
              </Routes>
            </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
