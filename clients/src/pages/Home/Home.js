import React, { useContext, useEffect, useRef, useState } from 'react'
import "./home.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify"
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom"
import Tables from '../../components/Tables/Tables';
import Spiner from '../../components/Spiner/Spiner';
import { addData, deleteData, userData } from '../../components/context/contexProvider';
import Alert from 'react-bootstrap/Alert';
import { usergetfunc } from '../../services/Apis';
import { deletefunc, exportcsvfunc } from './../../services/Apis';
const Home = () => {
  const searchRef = useRef(null);
  const [showspin, setShowspin] = useState(true);
  const { useradd, setUseradd } = useContext(addData);
  const { update, setupdate } = useContext(userData);
  const { deletedata, setdelete } = useContext(deleteData);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate();
  const addUser = () => {
    navigate('/register');
  }
  const userGet = async () => {
    const response = await usergetfunc(search, gender, status, sort, page);
    // console.log(response);
    // console.log(response.data.Pagination.pageCount);
    if (response.status === 200) {
      setUserData(response.data.userdata); // if we are not putting here userdat which is coming from the backend data will not show 
      setPageCount(response.data.Pagination.pageCount);

    } else {
      console.log("error for the getting data");
    }
  }

  //delete user
  const deleteUser = async (id) => {
    console.log(id);
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setdelete(response.data);
    } else {
      toast.error("error");
    }
  }


  //export csv

  const exprortuser = async () => {
    const response = await exportcsvfunc();
    // console.log(response);
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank")
    } else {
      toast.error(" ! error")
    }
  }

  //pagination 
  // previous handleprevious

  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page
      return page - 1
    })
  }

  // handle next btn

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page
      return page + 1
    })
  }
  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowspin(false);
    }, 1200);
    searchRef.current.focus();
  }, [search, gender, status, sort, page]);
  return (
    <>

      {
        useradd ? (
          <Alert variant="success" onClose={() => setUseradd("")} dismissible>
            {useradd.firstname.toUpperCase()} Successfully Added
          </Alert>
        ) : null
      }


        {
        update ? (
          <Alert variant="primary" onClose={() => setupdate("")} dismissible>
            {update.firstname.toUpperCase()} Updated Successfully
          </Alert>
        ) : null
      }
      
      


      {
        deletedata ? (
          <Alert variant="primary" onClose={() => setdelete("")} dismissible>
            {deletedata.firstname.toUpperCase()} Deleted Successfully
          </Alert>
        ) : null
      }

      {/* useradd  && useradd.firstname */}

      <div className="container ">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search By Name/Email/Mobile/Location ..."
                  className="me-2"
                  aria-label="Search"
                  ref={searchRef}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addUser} > <i className="fa-solid fa-plus" ></i>&nbsp; Add User</Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap ">
            <div className="export_csv">
              <Button className='export_btn' onClick={exprortuser}>Export To Csv</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"male"}
                    onChange={(e) => setGender(e.target.value)}


                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* short by value */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item Item onClick={() => setSort("old")} >Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {

              showspin ? <Spiner /> : <Tables
                userdata={userdata}
                deleteUser={deleteUser}
                userGet={userGet}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage} />

            }
          </div>

        </div>

        <ToastContainer />
      </div>
    </>
  )
}

export default Home