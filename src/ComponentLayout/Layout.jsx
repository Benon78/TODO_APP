import './Layout.css';  
import { Link, NavLink, Outlet } from 'react-router-dom';  
import logo from '../assets/Images/Logo.png';  
import { useEffect} from 'react';   
import DefaultPhoto from '../assets/Images/images.png'
import { imageEl } from '../../firebaseConfig'

const Layout = () => {  
    const activeStyles = {  
        textDecoration: "underline",  
        color: "#D8605B",  
    };  

    useEffect(() => {  

        // Scroll event for header background color  
        const header = document.querySelector('.header-container');  
        const handleScroll = () => {  
            header.style.backgroundColor = window.scrollY > 0 ? '#F4C25F' : 'transparent';  
        };  
        document.addEventListener('scroll', handleScroll); 
        // Fetch user image from firebase storage

        return () => {  
            document.removeEventListener('scroll', handleScroll);  
        };  
    }, []);  

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
                    <NavLink to='login' className='user-icon-link' id='avatar-link' aria-label='link to user login page'>  
                        <img src={imageEl?imageEl:DefaultPhoto} id='avatar-img' alt='avatar image'/>
                    </NavLink>  
                </nav>  
            </header>  


            <main>  
                <Outlet/>  
            </main>  
        </div>  
    );  
}  

export default Layout;

// currentUser ? 'user-icon-active' : 