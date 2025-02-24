import './Setting.css';  
import { actionLogout } from './Hooks/utils';  
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom' 

function Setting() {  
  const [logoutMessage, setLogoutMessage] = useState('');  
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom

  const handleLogout = async () => {  
      if (window.confirm('Are you sure you want to log out?')) {  
          actionLogout(); // Call the logout action  
          setLogoutMessage('You have been logged out successfully.'); // OPTIONAL: set success message  
          // Optionally redirect to login or homepage here  
          await new Promise(resolve => setTimeout(resolve, 2000));  
          return navigate("/login?message=You have been logged out.");  
        }  
        
  };  

  return (  
    <div className="setting-container">  
      <h1>Setting Page</h1>  
      {logoutMessage && <p>{logoutMessage}</p>}  
      <button className="setting-btn" onClick={handleLogout}>Log Out</button>  
    </div>  
  );  
}  

export default Setting;