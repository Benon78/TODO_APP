/** @format */  

import "../LoginPage/Login.css";  
import Home from "../../assets/Images/Home.png";  
import { Link, Form, useActionData, useNavigate } from "react-router-dom";  
import { FaEye, FaEyeSlash } from "react-icons/fa";  
import { useState, useEffect } from "react";  
import { actionRegister } from "../../ComponentLayout/Hooks/utils";  

export async function action({ request}) {  
    const registerData = await actionRegister(request);  
    return registerData;  
}  

function Register() {  
    const actionData = useActionData();  
    const navigate = useNavigate(); // To redirect after successful registration  
    const [showPassword, setShowPassword] = useState(false);  
    const [showError, setShowError] = useState(false);  
    const handlePasswordToggle = () => setShowPassword(!showPassword);  
    const [message, setMessage] = useState("");  
    const [inputValues, setInputValues] = useState({  
        username: "",  
        email: "",  
        password: "",  
    });  

    // useEffect to handle the action data  
    useEffect(() => {  

        // Redirect to login page if registration is successful within 2 seconds
        async function redirect() {
            if (actionData) {  
                setMessage(actionData.message);  
                setShowError(!actionData.success); // If not successful, show error  
    
                if (actionData.success) {  
                    setInputValues({  
                        username: "",  
                        email: "",  
                        password: "",  
                    });  
                    // Navigate to the login page or home after successful registration  
                    await new Promise(resolve => setTimeout(resolve, 2000));  
                    navigate("/login");  
                }  
            }  
        }
        redirect(); // Call the redirect function when the component mounts
    }, [actionData, navigate]); // Add navigate to dependencies  

    const handleInputChange = (e) => {  
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });  
    };  

    return (  
        <div className="login-container">  
            <div  
                className="login-header"  
                aria-roledescription="heading element the contain image of the home and welcome message"  
                aria-label="Get things done with TODO">  
                <img src={Home} alt="Home" />  
                <h1>Get things done with TODO</h1>  
            </div>  

            {message && (  
                <h5  
                    style={{ color: showError ? 'red' : "green", textAlign: "center", marginBottom: "10px" }}>  
                    {message}  
                </h5>  
            )}  

            <Form className="signUp-form" method="post" replace>  
                <input  
                    type="text"  
                    name="username"  
                    placeholder="Enter your Username"  
                    value={inputValues.username}  
                    onChange={handleInputChange}  
                    required  
                />  
                <input  
                    type="email"  
                    name="email"  
                    placeholder="Enter your email"  
                    value={inputValues.email}  
                    onChange={handleInputChange}  
                    required  
                />  
                <div className="input-password">  
                    <input  
                        type={showPassword ? "text" : "password"}  
                        name="password"  
                        placeholder="Enter your Password"  
                        value={inputValues.password}  
                        onChange={handleInputChange}  
                        aria-label="Password"  
                        aria-describedby="password-helper-text"  
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  
                        title="Must contain at least 8 characters, including uppercase letters, lowercase letters, and numbers."  
                        id="password"  
                        required  
                    />  
                    <span>  
                        {showPassword ? (  
                            <FaEyeSlash onClick={handlePasswordToggle} className="icon-eye" />  
                        ) : (  
                            <FaEye onClick={handlePasswordToggle} className="icon-eye" />  
                        )}  
                    </span>  
                </div>  
                <button type="submit" className="link-btn">  
                    Sign Up  
                </button>  
            </Form>  
            <div className="login-footer">  
                <p>  
                    Already have an account?  
                    <Link to="/login">Sign in</Link>  
                </p>  
            </div>  
        </div>  
    );  
}  

export default Register;