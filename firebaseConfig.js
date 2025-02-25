// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY9kG3WEI0ElzDBQXP_blV2ePrfVuVzJ8",
  authDomain: "todo-app-8e4e3.firebaseapp.com",
  projectId: "todo-app-8e4e3",
  storageBucket: "todo-app-8e4e3.firebasestorage.app",
  messagingSenderId: "711507716929",
  appId: "1:711507716929:web:63cfd877e16c293da94fc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export var imageEl = '';
export var userName = '';

// creating all the functionalities here for registration, login and logout from Firebase
// createUserWithEmailAndPassword from Firebase and export to register.jsx file
export const registerUserFirebase = async (request) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const email = formData.get("email");
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                return {
                    success: true,
                    message: 'User registered successfully'
                }
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                }
            }
}

// signInWithGoogle from Firebase and export to login.jsx file
export const loginWithGoogleFirebase = async () => {
    try {
             await signInWithPopup(auth, provider);
        return {
            success: true,
            message: 'User sign up successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}
export const signUPWithGoogleFirebase = async () => {
    try {
             await signInWithPopup(auth, provider);
        return {
            success: true,
            message: 'User logged in successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}



// signInWithEmailAndPassword  from  Firebase and export to login.jsx file
export const loginUserFirebase = async (request) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const email = formData.get("email");
            try {
                await signInWithEmailAndPassword(auth, email, password);
                return {
                    success: true,
                    message: 'User logged in successfully'
                }
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                }
            }
}

// signOut  from Firebase and export to settings.jsx
export const logoutUserFirebase = async () => {
    try {
        await signOut(auth);
        return {
            success: true,
            message: 'User logged out successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

// updateProfile from Firebase and export to settings.jsx
export const updateUserProfileFirebase = async (request) => {
    const formData = await request.formData();
    const displayName = formData.get("displayName");
    const photoURL = formData.get("photoURL");
    const user = auth.currentUser;
    try {
        await updateProfile(user, { displayName, photoURL });
        return {
            success: true,
            message: 'User profile updated successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

// onAuthStateChanged  
    // Listen for auth state changes
   onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log(user)
             imageEl = user.photoURL;
             userName = user.displayName.split(' ')[0];
             localStorage.setItem('isLoggedIn', "true");
            } else {
                localStorage.setItem('isLoggedIn', "false");
                imageEl = '';
                userName = '';
            
        }
    });













