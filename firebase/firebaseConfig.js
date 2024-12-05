import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA39_Z5jgUZJh4s8t5drI2VBKAcwCUMwqE",
  authDomain: "blogapp-a80a5.firebaseapp.com",
  projectId: "blogapp-a80a5",
  storageBucket: "blogapp-a80a5.firebasestorage.app",
  messagingSenderId: "989513351420",
  appId: "1:989513351420:web:1a6b2db216739014d25779",
  measurementId: "G-MFJF7Y16H5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
