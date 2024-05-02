import React, { useState } from "react";
import "./Login.css"; // Remove import of Login.css

const Login = ({ onLogin }) => {
  const [loginVisible, setLoginVisible] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(
      "Login form submitted with email:",
      email,
      "and password:",
      password
    );
    // Call onLogin function passed from App component
    onLogin();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.signupEmail.value;
    const password = e.target.signupPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    console.log(
      "Signup form submitted with name:",
      name,
      "email:",
      email,
      "password:",
      password,
      "confirmPassword:",
      confirmPassword
    );
  };

  const toggleForm = () => {
    setLoginVisible(!loginVisible);
  };

  return (
    <div className="container">
      <h1 className="heading">MINES 💣 & GEMS 💎</h1>

      <div className="section">
        <h2>{loginVisible ? "LOGIN" : "SIGN UP"}</h2>
        <form onSubmit={loginVisible ? handleLoginSubmit : handleSignupSubmit}>
          {loginVisible && (
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-field" onClick={(e) => e.target.classList.toggle("brighten")}>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-field" onClick={(e) => e.target.classList.toggle("brighten")}>
              <input type="password" id="password" name="password" required />
            </div>
          </div>
          {!loginVisible && (
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <div className="input-field" onClick={(e) => e.target.classList.toggle("brighten")}>
                <input type="text" id="name" name="name" required />
              </div>
            </div>
          )}
          {!loginVisible && (
            <div className="input-group">
              <label htmlFor="signupEmail">Email</label>
              <div className="input-field" onClick={(e) => e.target.classList.toggle("brighten")}>
                <input type="email" id="signupEmail" name="signupEmail" required />
              </div>
            </div>
          )}
          {!loginVisible && (
            <div className="input-group">
              <label htmlFor="signupPassword">Password</label>
              <div className="input-field" onClick={(e) => e.target.classList.toggle("brighten")}>
                <input type="password" id="signupPassword" name="signupPassword" required />
              </div>
            </div>
          )}
          {!loginVisible && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-field" onClick={(e) => e.target.classList.toggle("brighten")}>
                <input type="password" id="confirmPassword" name="confirmPassword" required />
              </div>
            </div>
          )}
          <button type="submit">{loginVisible ? "Login" : "Sign Up"}</button>
        </form>
        <p>
          {loginVisible ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm} className="toggle-link"> {loginVisible ? "Sign up now" : "Login here"}</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
