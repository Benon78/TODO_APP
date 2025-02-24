/** @format */

import { redirect } from "react-router-dom";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

export async function requiredAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    throw redirect(
      `/login?message=You need to login to access this page.&redirectTo=${pathname}`
    );
  }
}

const handleLogin = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.dispatchEvent(new Event("userChange")); // Dispatching custom event
};

export async function actionRegister(request) {
  const formData = await request.formData();
  const password = formData.get("password");
  const username = formData.get("username");
  const email = formData.get("email");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return {
      success: false,
      message: "User already exists. Please login.",
    };
  }

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    SECRET_KEY
  ).toString();
  const user = {
    username,
    email,
    password: encryptedPassword,
    userId: new Date().getTime(),
  };

  users.push(user); // Add new user to the array
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("isLoggedIn", "false");
  return {
    success: true,
    message: "User registered successfully. You can login now.",
  };
}

export async function actionLogin(request) {
  const formData = await request.formData();
  const password = formData.get("password");
  const username = formData.get("username");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const registeredUser = users.find((user) => user.username === username);
  if (registeredUser) {
    const decryptedPassword = CryptoJS.AES.decrypt(
      registeredUser.password,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword === password) {
      localStorage.setItem("isLoggedIn", "true");
      handleLogin(registeredUser); // Store user in local storage
      return {
        success: true,
        message: "Login successful",
      };
    }
  }
  return {
    success: false,
    message: "Invalid username or password",
  };
}

// Function to retrieve todos from local storage
export const getStoredTodos = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : {};
};



export async function actionLogout() {  
    // Clear user data from local storage  
    localStorage.removeItem("currentUser");  
    localStorage.setItem("isLoggedIn", "false");  
  
    // Dispatch a custom event to notify other parts of the app  
    window.dispatchEvent(new Event("userChange"));  
  
    // Optionally, you can redirect the user to the login page or home page  
    // return redirect("/login?message=You have been logged out.");  
  }