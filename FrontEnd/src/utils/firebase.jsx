import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// 🔹 Your Firebase config (Replace with your actual config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyB0QE9L_C9K3DHqxwDVOU_-3O26RY7SU3c",
  authDomain: "subashkumawat34@gmail.com",
  projectId: "commuteshare-df1a0",
  //storageBucket: "YOUR_PROJECT_ID.appspot.com",
  //messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  //appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Returns user info
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Function to sign in with GitHub
const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error) {
    console.error("GitHub Sign-In Error:", error);
    throw error;
  }
};

export { auth, signInWithGoogle, signInWithGithub };
