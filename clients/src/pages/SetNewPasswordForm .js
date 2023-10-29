import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SetNewPasswordForm = ({ onSetNewPassword }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add validation logic here, e.g., checking if newPassword === confirmPassword

    // Send the new password to the parent component
    onSetNewPassword(formData.newPassword);
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

          <label htmlFor="newPassword" className='my-2'>New Password</label>
          <div className='input-group'>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className='my-2'>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">Set New Password</button>
      </form>
    </div>
  );
}

export default SetNewPasswordForm;
