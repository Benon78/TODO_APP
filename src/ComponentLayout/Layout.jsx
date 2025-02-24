import './Layout.css';  
import { Link, NavLink, Outlet } from 'react-router-dom';  
import { FaUser } from 'react-icons/fa';  
import logo from '../assets/Images/Logo.png';  
import { useEffect, useState,useCallback } from 'react';   
import { toast } from 'react-toastify'
const Layout = () => {  
    const activeStyles = {  
        textDecoration: "underline",  
        color: "#D8605B",  
    };  

    const [currentUser, setCurrentUser] = useState(null);  

    const updateUser = useCallback(() => {  
        const user = localStorage.getItem('currentUser');  
        try {  
            setCurrentUser(user ? JSON.parse(user) : null);  
        } catch (error) {  
            toast.error("Failed to parse user data from localStorage", error);  
            setCurrentUser(null);  
        }  
    }, []);  

    useEffect(() => {  

        // Initial load  
        updateUser();  

        // Event listener for localStorage changes  
        window.addEventListener('storage', updateUser);  

        // Custom event listener for updates in the same tab  
        const handleUserChange = () => updateUser();  
        window.addEventListener('userChange', handleUserChange);  

        // Scroll event for header background color  
        const header = document.querySelector('.header-container');  
        const handleScroll = () => {  
            header.style.backgroundColor = window.scrollY > 0 ? '#F4C25F' : 'transparent';  
        };  
        document.addEventListener('scroll', handleScroll);  

        return () => {  
            window.removeEventListener('storage', updateUser);  
            window.removeEventListener('userChange', handleUserChange);  
            document.removeEventListener('scroll', handleScroll);  
        };  
    }, [updateUser]);  

    return (  
        <div className='layout-container'>  
            <header className='header-container'>  
                <Link to='/' className='site-logo' aria-label='link that contain the todo logo which navigate to the home page'>  
                    <img src={logo} alt="Image of todo logo" />  
                </Link>  
                <nav className='nav-container'>  
                    <NavLink to='/' style={({ isActive }) => (isActive ? activeStyles : null)} aria-label='link to home page'>  
                        HOME  
                    </NavLink>  
                    <NavLink to='todo' style={({ isActive }) => (isActive ? activeStyles : null)} aria-label='link to todos page'>  
                        TODOS  
                    </NavLink>  
                    <NavLink to='login' className='user-icon-link' aria-label='link to user login page'>  
                        <FaUser className={currentUser ? 'user-icon-active' : 'user-icon-inactive'} />  
                    </NavLink>  
                </nav>  
            </header>  

            <main>  
                <Outlet context={currentUser}/>  
            </main>  
        </div>  
    );  
}  

export default Layout;