import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginForm from '../../pages/login/LoginForm';
import UserRegister from '../../pages/userRegister/UserRegister';
import ForgotPasswordForm from '../../pages/ForgotPasswordForm ';
import { Link } from "react-router-dom"
import SetNewPasswordForm from '../../pages/SetNewPasswordForm ';
import NavDropdown from "react-bootstrap/NavDropdown"
import { AuthContext } from './../context/AuthProvider';
const Headers = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const { user, logout } = useContext(AuthContext);


  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  }

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // ... (code for login and register modals)

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
    setShowLogin(false); // Close the login modal
  }

  const handleCloseForgotPassword = () => setShowForgotPassword(false);


  const [showSetNewPasswordModal, setShowSetNewPasswordModal] = useState(false);
  const handleShowSetNewPasswordModal = () => setShowSetNewPasswordModal(true);

  const handleSetNewPassword = (newPassword) => {
    // Add your logic to handle the new password
    console.log('New password set:', newPassword);
    handleCloseSetNewPasswordModal(); // Close the modal after setting the new password
  }
  // const handleCloseSetNewPasswordModal = () => setShowSetNewPasswordModal(false);
  const handleCloseSetNewPasswordModal = () => setShowSetNewPasswordModal(false);

 
  return (


    <Navbar bg="warning" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="#home">Mern_stack Projects</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/" className="text-decoration-none"><i className="fa fa-home"></i> Home</NavLink>
        </Nav>
       

      {/*   <Nav>
          <NavDropdown title={<><i className='fa fa-user'></i> Profile</>} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleShowLogin}>Login</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
        {user ? (
          <NavDropdown title={<><i className='fa fa-user'></i> {user.name}</>} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={logout}><i className='fa fa-sign-out'></i> Logout</NavDropdown.Item>
            <NavDropdown.Item>  <i className='fa fa-cog'></i> Profile setting</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <NavDropdown title={<><i className='fa fa-user'></i> Profile</>} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleShowLogin}><i className="fa fa-user"></i> Login</NavDropdown.Item>
            {/* ... (other items) */}
          </NavDropdown>
        )}


      </Container>
      <Modal show={showLogin} onHide={handleCloseLogin} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title><i className='fa fa-user'></i> Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onForgotPasswordClick={handleCloseLogin} handleCloseLogin={handleCloseLogin} handleShowForgotPassword={handleShowForgotPassword} />
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <div>
              <p>Don't have an account? <span className="register-link" ><Link onClick={handleShowRegister}  >Click here</Link></span></p>
            </div>
            <div>
              <Button variant="secondary" onClick={handleCloseLogin}>
                Close
              </Button>
            </div>
          </div>

        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title> <i className='fa fa-user-plus'></i> Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserRegister handleClose={handleCloseRegister} handleShowLogin={handleShowLogin} />
        </Modal.Body>

      </Modal>

      <Modal show={showForgotPassword} onHide={handleCloseForgotPassword} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title><i className='fa fa-eye-slash bgwarning'></i> Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForgotPasswordForm handleShowSetNewPasswordModal={handleShowSetNewPasswordModal} handleCloseForgotPassword={handleCloseForgotPassword} />
        </Modal.Body>
      </Modal>

      <Modal show={showSetNewPasswordModal} onHide={handleSetNewPassword} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>Set New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SetNewPasswordForm onSetNewPassword={handleSetNewPassword} />
        </Modal.Body>
      </Modal>
    </Navbar>
  )
}

export default Headers;
