import './Setting.css';  
// import { actionLogout } from './Hooks/utils';  
import { useState,useEffect } from 'react'; 
import { Form, useNavigate, useActionData } from 'react-router-dom' 
import { logoutUserFirebase, updateUserProfileFirebase } from '../../firebaseConfig'

export const action = async ({ request }) => {
    const userData = await updateUserProfileFirebase(request);
    return userData;
}
function Setting() {  
  const actionData = useActionData();
  const navigate = useNavigate(); // Import the useNavigate hook from react-router-dom
  const [logoutMessage, setLogoutMessage] = useState(''); 
  const [showError, setShowError] = useState(false);  
  const [message, setMessage] = useState("");   
  const [inputValues, setInputValues] = useState({  
    displayName: "",  
    photoURL: "",   
  });  
  const handleLogout = async () => {  
    // Simulate an asynchronous logout process
    const { message, success} = await logoutUserFirebase();

           if(success){
             setLogoutMessage(message);
             await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before redirecting
             navigate("/login?message=You have been logged out."); // Redirect to login page with success message after logout  
           }
           
           setLogoutMessage(message);
  };  

  useEffect(() => {  
          if (actionData) {  
              setMessage(actionData.message);  
              setShowError(!actionData.success); // Show error if login failed  
              if (actionData.success) {  
                  setInputValues({  
                      displayName: "",  
                      photoURL: "",  
                  });  
              }  
          }  
      }, [actionData]);

      
      const handleInputChange = (e) => {  
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });  
    };  

  return (  
    <div className="setting-container">  
      <h1>Update profile</h1>  
      {logoutMessage && <p>{logoutMessage}</p>}  
      {message && (  
                <h5  
                    style={{ color: showError ? 'red' : "green", textAlign: "center", marginBottom: "10px" }}>  
                    {message}  
                </h5>  
            )} 
      <Form method="POST" className='profile-update-form'  replace>
            <input 
            type="text" 
            name='displayName'
            placeholder="Enter your display name" 
            required 
            value={inputValues.displayName}
            autoComplete='false'
            onChange={handleInputChange}
            />
            <input 
            type="text" 
            name="photoURL"  
            value={inputValues.photoURL}
            onChange={handleInputChange}
            placeholder="https://example.com/profile.jpg"
           autoComplete='false'
            required
            />
            <button type="submit" className="setting-btn">Update Profile</button>
      </Form>
      <button className="setting-btn" onClick={handleLogout}>Log Out</button>  
    </div>  
  );  
}  

export default Setting;