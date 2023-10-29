import React, { useState } from 'react';

const ForgotPasswordForm = ({ handleShowSetNewPasswordModal, handleCloseForgotPassword }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your logic for handling forgot password request here
  //   console.log('Form submitted:', formData);

  //   // Close the form after submission (you can customize this behavior)
  //   onClose();
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling forgot password request here
    console.log('Form submitted:', formData);

    // Close the form after submission (you can customize this behavior)
    // onClose();

    // Show the "Set New Password" modal
    handleCloseForgotPassword();
    handleShowSetNewPasswordModal();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className='my-2'>Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className='my-2'>Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
        <button type="button" className="btn btn-link" >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
