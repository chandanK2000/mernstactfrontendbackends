import React, { useContext, useEffect, useState } from 'react'
import './register.css'
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import Spiner from '../../components/Spiner/Spiner';
import { regitsterfunc } from './../../services/Apis';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../components/context/contexProvider';
const Register = () => {

  const [inputdata, setInputData] = useState({
    firstname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const [showspin, setShowspin] = useState(true);

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);

  //status options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  //set input value
  /*  const setInputvalue = (e) => {
     const { name, value } = e.target;
     setInputData({ ...inputdata, [name]: value });
   } */

  const setInputvalue = (e) => {
    const { name, value } = e.target;
    if (name === 'firstname') {
      setInputData({ ...inputdata, [name]: value.charAt(0).toUpperCase() + value.slice(1) });
    } else {
      setInputData({ ...inputdata, [name]: value });
    }
  }

  // console.log(inputdata);

  //set status value

  const SetStatusValue = (e) => {
    setStatus(e.value);
    // console.log(e)
  }

  //set profile

  const SetProfile = (e) => {
    // console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  //submit user data

  const SubmitUserData = async (e) => {
    e.preventDefault();
    const { firstname, lname, email, mobile, gender, location } = inputdata;

    if (firstname === "") {
      toast.error("firstname  is required");
    } else if (lname === "") {
      toast.error("LastName is required");

    }
    else if (email === "") {
      toast.error("Email is required");

    } else if (!email.includes('@')) {
      toast.error("Enter valid eamil id ");

    } else if (mobile === "") {
      toast.error("Mobile number is requried");

    } else if (mobile.length !== 10) {
      toast.error("Mobile number should be 10 digits");


    } else if (status === "") {
      toast.error("Status is required");
    }


    else if (gender === "") {
      toast.error("Gender is required");

    } else if (image === "") {
      toast.error("images is required");

    } else if (location === "") {
      toast.error("location is required");

    } else {
      // toast.success("Registration successfully done");
      const data = new FormData();
      data.append("firstname", firstname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("status", status)
      data.append("gender", gender)
      data.append("location", location)
      data.append("user_profile", image)

      const config = {
        "Content-Type": "multipart/form-data"
      }
      const response = await regitsterfunc(data, config);
      // console.log(response);
      if (response.status === 200) {
        setInputData({
          firstname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        });
        setStatus('');
        setImage('');
        // setUseradd(response.data);
        setUseradd({ firstname: firstname });

        navigate('/');
      }
      else {
        toast.error("Error !");
      }
    }


  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowspin(false);
    }, 1200);
  }, [image])

  return (
    <>
      {showspin ? <Spiner /> :
        <div className='container'>
          <h2 className='text-center my-3 text-primary'>Add Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className='profile_div text-center'>
              <img src={preview ? preview : "/chandan.jfif"} alt="Description" />
            </div>
            <Form onSubmit={SubmitUserData} onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                SubmitUserData(e);
              }
            }}>
              <Row>


                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstname" value={inputdata.firstname} placeholder='Enter first name' onChange={setInputvalue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lname" value={inputdata.lname} placeholder='Enter last name' onChange={setInputvalue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={inputdata.email} placeholder='Enter email ' onChange={setInputvalue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Mobile number</Form.Label>
                  <Form.Control type="tel" name="mobile" value={inputdata.mobile} placeholder='Enter mobile number' maxLength="10" onChange={setInputvalue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={'radio'}
                    label={'male'}
                    name="gender"
                    value={"male"}
                    onChange={setInputvalue}
                  />
                  <Form.Check
                    type={'radio'}
                    label={'female'}
                    name="gender"
                    value={"female"}
                    onChange={setInputvalue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    onChange={SetStatusValue}
                    options={options}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control type="file" name="user_profile" placeholder='Enter profile ' onChange={SetProfile} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control type="text" name="location" value={inputdata.location} placeholder='Enter Location ' onChange={setInputvalue} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={SubmitUserData}>
                  <i className='fa fa-save'></i> Save User
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"></ToastContainer>
        </div>}
    </>

  )
}

export default Register;