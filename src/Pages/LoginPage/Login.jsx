/** @format */  

import "./Login.css";  
import Home from "../../assets/Images/Home.png";  
import { Link, Form, useActionData, useLoaderData, redirect, useNavigation} from "react-router-dom";  
import { useState, useEffect } from "react";  
import { FaEye, FaEyeSlash } from "react-icons/fa";  
import { actionLogin } from "../../ComponentLayout/Hooks/utils";  

// Create the loader function to load the message from the URL  
export async function loader({ request }) {  
    return new URL(request.url).searchParams.get("message");  
}  

// Create the action function to handle the login  
export async function action({ request }) {  
    const loginData = await actionLogin(request);  
    const pathname = new URL(request.url).searchParams.get("redirectTo") || '/todo';  

    if (loginData.success) {  
        // Wait for 2 seconds before redirecting  
        await new Promise(resolve => setTimeout(resolve, 2000));  
        return redirect(pathname); // Return the redirect after the delay  
    }  
    return loginData;  
}  

function Login() {  
    const actionData = useActionData();  
    const messageData = useLoaderData(); 
    const navigation = useNavigation(); 

    const [message, setMessage] = useState("");  
    const [showPassword, setShowPassword] = useState(false);  
    const [showError, setShowError] = useState(false);  
    const handlePasswordToggle = () => setShowPassword(!showPassword);  
    const [inputValues, setInputValues] = useState({  
        username: "",  
        password: "",  
    });  

    useEffect(() => {  
        if (actionData) {  
            setMessage(actionData.message);  
            setShowError(!actionData.success); // Show error if login failed  
            if (actionData.success) {  
                setInputValues({  
                    username: "",  
                    password: "",  
                });  
            }  
        }  
    }, [actionData]);  

    const handleInputChange = (e) => {  
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });  
    };  

    return (  
        <div className="login-container">  
            <div  
                className="login-header"  
                aria-roledescription="heading element containing image of the home and welcome message"  
                aria-label="Welcome to the Virtual Reality Experience">  
                <img src={Home} alt="Home" />  
                <h1>Welcome to the Virtual Reality Experience</h1>  
            </div>  
            {messageData && (  
                <h5  
                    style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>  
                    {messageData}  
                </h5>  
            )}  
            {message && (  
                <h5  
                    style={{ color: showError ? 'red' : "green", textAlign: "center", marginBottom: "10px" }}>  
                    {message}  
                </h5>  
            )}  
            <Form method="post" className="signIn-form" replace>  
                <input  
                    type="text"  
                    name="username"  
                    placeholder="Enter your Username"  
                    value={inputValues.username}  
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
                <button 
                type="submit"
                className="link-btn"
                disabled={navigation.state === 'submitting'}
                >  
                    {navigation.state ==='submitting'
                        ? 'Loading...' 
                        :  'Login'
                    }
                </button>  
            </Form>  
            <div className="login-footer">  
                <p>  
                    Don&apos;t have an account?  
                    <Link to="/register">Sign Up</Link>  
                </p>  
            </div>  
        </div>  
    );  
}  

export default Login;