import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Typical from 'react-typical'

const Home = () => {

  const [userper, setUserper] = useState({})
  const [userpro, setUserpro] = useState({})
  // const personadata = personaldatafetch
  async function personal_data_fetching() {

    if (JSON.parse(localStorage.getItem('qwert')) == null)
      window.location.href = '/error'
    const items = JSON.parse(localStorage.getItem('qwert'))
    const email = items.email
    const token = items.token
    // e.preventDefault()
    const response = await fetch('http://localhost:6969/api/personaldatafetch', {


      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        email
      }),
    })
    const data = await response.json()
    console.log(data)
    localStorage.setItem("personaldata", JSON.stringify(data.user))
    setUserper(JSON.parse(localStorage.getItem('personaldata')))
    // return data.user
  }

  async function professional_data_fetching() {

    if (JSON.parse(localStorage.getItem('qwert')) == null)
      window.location.href = '/error'
    const items = JSON.parse(localStorage.getItem('qwert'))
    const email = items.email
    const token = items.token

    // e.preventDefault();

    const response = await fetch('http://localhost:6969/api/professionaldatafetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        email
      }),
    })
    const data = await response.json()
    console.log(data)
    localStorage.setItem("professionaldata", JSON.stringify(data.user))

    setUserpro(JSON.parse(localStorage.getItem('professionaldata')))
    // return data.user
  }


  useEffect(() => {
    personal_data_fetching()
    professional_data_fetching()
  }, [])

  return (
    <div>
      <div className='navbar'>
        <h1 > <Typical
          loop={Infinity}
          steps={[
            "Preference", 1000,
            "  ", 10
          ]} /></h1>
        <ul className='nav'>
          <li className='nav-item'><a className="nav-link "><Link to='/home'>Home</Link></a></li>
          <li className='nav-item'><a className="nav-link ">Hi,{JSON.parse(localStorage.getItem('qwert')) !== null && JSON.parse(localStorage.getItem('qwert')).name}</a></li>
          <li className='nav-item'><button className='btn btn-danger' onClick={(e) => {
            localStorage.clear()
            window.location.href = '/'
          }}>Logout</button></li>

        </ul>

      </div>
      <div className='datadiv'>
        {/* <h1>sadgjhg</h1>
        {
          userper.weight
        }
        {  userpro.linkedin} */}
        <span>
          <div className='personal-div'>
            <h1>Personal Details</h1>
            <br />
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th scope='col'>Food Habits :</th>
                  <th scope='col'>{userper.hobbies && userper.hobbies.map(hobbie => {
                    return (
                      <h5 >{hobbie}</h5>
                    )
                  })}</th>
                </tr>
                <tr>
                  <th scope='col'>TShirt Size :</th>
                  <th scope='col'>{userper.tShirt}</th>
                </tr>
                <tr>
                  <th scope='col'>Height :</th>
                  <th scope='col'>{userper.height} CM</th>
                </tr>
                <tr>
                  <th scope='col'>Weight :</th>
                  <th scope='col'>{userper.weight} KG</th>
                </tr>
                <br></br>
                <button type='submit' className='btn btn-danger' onClick={(e) => {
                  window.location.href = '/personal'
                }}>Edit</button>
              </tbody>
            </table>

          </div>
          <div className='professional-div'>
            <h1>Professional Details</h1>
            <br />
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th scope='col'>LinkedIn URL :</th>
                  <th scope='col'>{userpro.linkedin}</th>
                </tr>
                <tr>
                  <th scope='col'>Company :</th>
                  <th scope='col'>{userpro.company}</th>
                </tr>
                <tr>
                  <th scope='col'>Work Experience :</th>
                  <th scope='col'>
                    {userpro.work && userpro.work.map(work => {
                      return (
                        <h5>{work}</h5>
                      )
                    })}
                  </th>
                </tr>
                <tr>
                  <th scope='col'>Skills :</th>
                  <th scope='col'>{
                    userpro.skills && userpro.skills.map(skill => {
                      return (
                        <h5>{skill}</h5>
                      )
                    })}</th>
                </tr>
                <br></br>
                <button type='submit' className='btn btn-danger' onClick={(e) => {
                  window.location.href = '/professional'
                }}>Edit</button>
              </tbody>
            </table>
          </div>
        </span>
      </div>
    </div>
  )
}

export default Home
