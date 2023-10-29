import React, { useEffect, useState } from 'react'
import './profile.css'
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Spiner from '../../components/Spiner/Spiner';
import { useParams } from 'react-router-dom';
import { singleusergetfunc } from './../../services/Apis';
import { BASE_URL } from '../../services/Helper';
import moment from "moment";
const Profile = () => {
  const [showspin, setShowspin] = useState(true);
  const [userpofile, setUserprofile] = useState([]);
  const { id } = useParams();
  console.log(id);
  const useprofileGet = async () => {
    const response = await singleusergetfunc(id);
    // console.log(response);
    if (response.status === 200) {
      setUserprofile(response.data)
    }else{
      console.log("error")
    }
  }

  useEffect(() => {
    useprofileGet();
    setTimeout(() => {
      setShowspin(false);
    }, 1200);
  }, [])
  return (
    <>
      {
        showspin ? <Spiner /> : <div className='container mt-4'>
          <Card className='card-profile shadow col-lg-6 mt-5 mx-auto'>
            <Card.Body>
              <Row>
                <div className='col'>
                  <div className='card_profile_stats d-flex justify-content-center'>
                    <img src={`${BASE_URL}/uploads/${userpofile.profile}`} alt='' style={{height:"100px",width:"100px"}} className='rounded-circle img-fluid shadow-sm' />
                  </div>
                </div>
              </Row>
              <div className='text-center'>
                <h3>{userpofile.firstname + " "+ userpofile.lname}</h3>
                <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:- <span>{userpofile.email}</span> </h4>
                <h5><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>{userpofile.mobile}</span> </h5>
                <h4><i class="fa-solid fa-person"></i>&nbsp;:- <span>{userpofile.gender}</span> </h4>
                <h4><i class="fa-solid fa-location-pin location"></i>&nbsp;:- <span>{userpofile.location}</span></h4>
                <h4>Status&nbsp;:- <span>{userpofile.status}</span> </h4>
                <h5><i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Created&nbsp;:- <span>{moment(userpofile.datecreated).format('DD-MM-YYYY')}</span> </h5>
                <h5> <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- <span>{userpofile.dateUpdated}</span> </h5>
              </div>

            </Card.Body>
          </Card>
        </div >
      }
    </>
  )
}

export default Profile;