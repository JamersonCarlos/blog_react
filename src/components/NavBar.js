import React from 'react'
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../context/AuthContext';

function NavBar() {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    
  return (
    <nav>
        <NavLink to="/" className={({isActive}) => (isActive ? "brand" : "brand")}>
            Mini <span>Blog</span>
        </NavLink>
        <ul>
            <li>
                <NavLink to="/"  className={({isActive}) => (isActive ? "active" : "")}>
                    Home
                </NavLink>
            </li>
            {!user && (
                <>
                    <li>
                        <NavLink to="/login" className={({isActive}) => (isActive ? "active" : "")}>
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={({isActive}) => (isActive ? "active" : "")}>
                            Cadastrar
                        </NavLink>
                    </li>
                </>
            )}
            {user && (
                <>
                    <li>
                        <NavLink to="/posts/create" className={({isActive}) => (isActive ? "active" : "")}>
                            Novo Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({isActive}) => (isActive ? "active" : "")}>
                            Dashboard
                        </NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? "active" : "")}>
                    Sobre
                </NavLink>
            </li>
            {user && 
                <>
                    <li>
                        <button onClick={logout}>
                            Sair
                        </button>
                    </li>
                </>
            }
        </ul>
    </nav>
  )
}

export default NavBar