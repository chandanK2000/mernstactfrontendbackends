import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { AuthContext } from './../../components/context/AuthProvider';
const LoginForm = ({ onForgotPasswordClick, handleCloseLogin, handleShowForgotPassword }) => {

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const [toastShown, setToastShown] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here using formData
    // console.log('Form submitted:', formData);
    if (toastShown) {
      return; // If toast has already been shown, do nothing
    }
    try {
      const response = await fetch('http://localhost:8000/user/userlogin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        
        const data = await response.json();
        // console.log(data);
        const { message, name, token } = data;
        const userData = {
          email: formData.email,
          password: formData.password,
          name: name,
          message:message,
          token: token
        };

        // Call the login function with the user data
        login(userData);

        handleCloseLogin();
        // toast.success("User Login Successfully");
        toast.success(`Welcome, ${name}! You are Login Sucessfully`);

      } else {
        const data = await response.json();
        console.log(data);
        toast.error(data.error || 'An error occurred during login.');

        setToastShown(true); // Set toastShown to true after showing the toast
      
        setTimeout(() => {
          setToastShown(false);
        }, 7000); 
      
      }
     
    } catch (error) {
      toast.error('Error:', error);
    }

  }


  // hide and show password

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className='my-2'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            // required
            className='form-control'
          />

        </div>
        <div className="form-group">
          <label htmlFor="password" className='my-2'>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              // required
              className='form-control'
            />
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={toggleShowPassword}
            >
              {/* {showPassword ? "Hide" : "Show"} */}
              {showPassword ? <FaEye /> : <FaEyeSlash />}

            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary my-2" >Login</button>
        <button
          type="button"
          className="btn btn-link"

          onClick={() => {
            handleCloseLogin();
            handleShowForgotPassword();
          }}

        >
          Forgot Password ?
        </button>

      </form>
    </div>
  );
}

export default LoginForm;
