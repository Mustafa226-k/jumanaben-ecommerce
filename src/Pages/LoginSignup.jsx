import React, { useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, googleProvider  } from "../firebase/authentication";
import "../style/authentication.css";

const getAuthErrorMessage = (error) => {
  switch (error.code) {
    // email/password
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/account-exists-with-different-credential": 
      return "Account exists with different credential.";

    // google
    case "auth/account-exists-with-different-credential":
      return "Account exists with different credential.";
    case "auth/popup-closed-by-user":
      return "Popup closed by user.";
    case "auth/cancelled-popup-request":
      return "Popup request cancelled.";
    case "auth/popup-blocked":
      return "Popup blocked.";
    default:
      return "An error occurred. Please try again.";
  }
};




const handleFrogetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    alert(err.message);
  }
};


const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider );
      console.log("google button clicked")
    } catch (err) {
     alert(getAuthErrorMessage(err))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      isSignup
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
       alert(getAuthErrorMessage(err))
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className={`flip-card ${isSignup ? "flipped" : ""}`}>
        <div className="flip-card-inner">

          {/* Front Side - Login */}
          <div className="flip-card-front">
            <div className="auth-content">
              <h1>Welcome Back</h1>
              <p>Login to your account</p>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={!isSignup ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span onClick={() => handleFrogetPassword(email)}>Forgot Password?</span>
                </div>
                <div className="switch-text" style={{marginBottom : 10}}>
                  <span onClick={() => handleFrogetPassword(email)}>Forgot Password?</span>
                </div>
                <button className="auth-btn" type="submit">Login</button>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <button className="google-btn" onClick={handleGoogleAuth}>
                <svg className="google-icon" viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Continue with Google
              </button>

              <p className="switch-text">
                New here? <span onClick={() => setIsSignup(true)}>Create an account</span>
              </p>
            </div>
          </div>

          {/* Back Side - Signup */}
          <div className="flip-card-back">
            <div className="auth-content">
              <h1>Create Account</h1>
              <p>Join Mustafa Collection`s Time Less Fashion World</p>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Create Password"
                    required
                    value={isSignup ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="auth-btn" type="submit">Sign Up</button>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <button className="google-btn" onClick={handleGoogleAuth}>
                <svg className="google-icon" viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Continue with Google
              </button>

              <p className="switch-text">
                Already have an account? <span onClick={() => setIsSignup(false)}>Login</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;
