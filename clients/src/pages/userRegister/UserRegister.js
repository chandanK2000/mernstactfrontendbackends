import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = ({ handleClose, handleShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    mobile: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  // console.log(formData);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }
  const handleRedirectToLogin = () => {
    handleShowLogin();
    handleClose(); // Close the registration modal
  }



  // register form validation here

  const validateForm = () => {
    const errors = [];

    if (!formData.username.trim()) {
      errors.push('Username is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.push('Invalid email format. It should contain at least one letter, one number, and one special character (@, ., etc.).');
    }
    /*  else {

      errors.push("");
    } */


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!formData.password.trim()) {

      errors.push('Password is required');
    } else if (!passwordRegex.test(formData.password)) {
      errors.push('Password must contain at least one letter, one number, and one special character, and be at least 8 characters long');
    }
   /*  else {
      errors.push("");
    }
 */
    const mobileRegex = /^[6789]\d{9}$/;

    if (!formData.mobile.trim()) {
      errors.push('Mobile is required');
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.push('Mobile number must start with 6, 7, 8, or 9 and be exactly 10 digits');
    }
   /*   else {
      errors.push("");
    } */


    if (!formData.address.trim()) {
      errors.push('Address is required');
    } 
   /*  else {
      errors.push = "";
    } */

    return errors;
  };


  //regisered functionality start here
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    const errors = validateForm();

    console.log(errors);
    if (errors.length === 0) {
      try {
        const response = await fetch('http://localhost:8000/user/userRegister', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)

        });
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setFormData({
            username: '',
            email: '',
            password: '',
            address: '',
            mobile: ''
          });
          handleClose();
          handleShowLogin();
          toast.success('User registered successfully!');
        } else {
          toast.error(data.error || 'An error occurred during registration.');
        }

      } catch (error) {
        toast.error('Error:', error);

      }
    } else
    // errors.forEach(error => toast.error(error));// for every error the toast will display
    // toast.error('Please correct the following errors:\n\n' + errors.join('\n'));
    {
      const errorList = errors.map((error, index) => (
        <li key={index}>{error}</li>
      ));

      toast.error(
        <div>
          <p>Please correct the following errors:</p>
          <ul>{errorList}</ul>
        </div>
      );
    }




    // handleClose();
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className='my-2'>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            // required
            className='form-control'
          />

        </div>
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
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
            >
              {/* {showPassword ? "Hide" : "Show"} */}
              {showPassword ? <FaEye /> : <FaEyeSlash />}

            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address" className='my-2'>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            // required
            className='form-control'
          />

        </div>
        <div className="form-group">
          <label htmlFor="mobile" className='my-2'>Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            // required
            className='form-control'
            maxLength="10"
          />

        </div>
        <button type="submit" className='btn btn-primary my-2 form-control'>Register</button>
        <p>Already have an account? <Link to="#" onClick={handleRedirectToLogin}>Login here</Link></p>

      </form>
    </div>
  );
}

export default UserRegister;
