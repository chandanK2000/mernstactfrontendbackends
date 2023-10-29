import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { BASE_URL } from '../../services/Helper';
import { statuschangefunc } from '../../services/Apis';
import { ToastContainer, toast } from "react-toastify"
import "./table.css"
import { NavLink } from 'react-router-dom';
import Paginations from './../Pagination/Paginations';

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {


  const handleChange = async (id, status) => {
    // console.log(id, status);
    const response = await statuschangefunc(id, status)
    // console.log(response);
    if (response.status === 200) {
      userGet();
      toast.success("status Successfully updated");
    } else {
      toast.error("error");
    }
  }

  //confirmation delete
  const confirmDelete = (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this user?");
    if (shouldDelete) {
      deleteUser(id);
    }
  }

  const generateDownloadableContent = (user) => {
    const content = `
    Full Name: ${user.firstname} ${user.lname}
    Email: ${user.email}
    Gender: ${user.gender}
    Mobile: ${user.mobile}
    Status: ${user.status}
    Location: ${user.location}
    Image Path: ${BASE_URL}/uploads/${user.profile}
  `;

    const blob = new Blob([content], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  };

  const handleDownload = (user) => {
    const contentURL = generateDownloadableContent(user);

    const link = document.createElement('a');
    link.href = contentURL;
    link.download = `user_details_${user._id}.txt`;
    link.click();
  };

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center  table-striped w-100 justify-content-center text-center' responsive="sm">
                <thead>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Mobile</th>
                    <th>Location</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1) * 4}</td>
                            {/* 4+1=5 */}
                            <td>{element.firstname + " " + element.lname}</td>
                            {/* <td>{element.firstname.charAt(0).toUpperCase() + element.firstname.slice(1) + " " + element.lname}</td> */}
                            <td>{element.email}</td>
                            <td>{element.gender === "male" ? "M" : "F"}</td>
                            <td>{element.mobile}</td>
                            <td>{element.location}</td>
                            <td className='d-flex justify-content-center align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status === "Active" ? "primary" : "danger"}>{element.status} <i className='fa-solid fa-angle-down'></i></Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img className='img-fluid rounded-circle image_hover' src={`${BASE_URL}/uploads/${element.profile}`} alt="profil"  />
                            </td>
                            <td>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle variant="light" className='action' id="dropdown-basic">
                                  <i className='fa-solid fa-ellipsis-vertical'></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-eye" style={{ color: "green" }}></i><span> view</span>
                                    </NavLink>

                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                      <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i><span> Edit</span>
                                    </NavLink>

                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    {/* <div onClick={() => deleteUser(element._id)}> */}
                                    <div onClick={() => confirmDelete(element._id)}>
                                      <i className="fa-solid fa-trash" style={{ color: "green" }}></i><span> Delete</span>
                                    </div>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <div onClick={() => handleDownload(element)}>
                                      <i className="fa-solid fa-download" style={{ color: "violet" }}></i><span> Download</span>
                                    </div>
                                  </Dropdown.Item>


                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className="no-data-message">No data</div>
                  }


                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        {/* <ToastContainer /> */}
      </div>
    </>
  )
}

export default Tables;