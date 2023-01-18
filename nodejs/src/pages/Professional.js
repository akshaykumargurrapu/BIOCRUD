import React, { useState, useEffect, useContext } from 'react'
import { dataContext } from '../nodeContext';
import { Link } from 'react-router-dom'

const Professional = () => {

  const [data, setData] = useState('');
  const [data1, setData1] = useState('');
  const [linkedin, setLinkedin, company, setCompany,
    skills, setSkills, work, setWork] = useContext(dataContext)

  const changeHandler = () => {
    setSkills([...skills, data]);
    // console.log(hobbies)

  }
  const changeHandlerwork = (e) => {
    setWork([...work, data1]);
    // console.log(hobbies)

  }


  const remove = (item) => {
    console.log(item)
    let filteredArr = skills.filter((e) => e !== item);
    console.log(filteredArr)
    setSkills(filteredArr)
  }
  const removework = (item) => {
    console.log(item)
    let filteredArr = work.filter((e) => e !== item);
    console.log(filteredArr)
    setWork(filteredArr)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('professionaldata'))
    console.log(data)
    setLinkedin(data.linkedin)
    setCompany(data.company)
    setSkills(data.skills)
    setWork(data.work)
  },[])


  async function professional_data(e) {
    const items = JSON.parse(localStorage.getItem('qwert'))
    const email = items.email
    const token = items.token
    e.preventDefault()
    let body = {
      token,
      email,
      linkedin,
      company,
      skills,
      work
    }
    Object.keys(body).forEach(key => {
      console.log('asd')
      if (body[key] === '') { delete body[key] }
    })

    const response = await fetch('http://localhost:6969/api/professionaldata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        email,
        linkedin,
        company,
        skills,
        work
      }),
    })
    const data = await response.json()
    console.log(data)
    if (data.status === 'ok')
      alert("Updated Data")
    else
      alert("Error")
    window.location.href = '/Home'
  }
  return (
    <div className='main'>
      <div className='navbar'>
        <h1>Preference</h1>
        <ul className='nav'>
          <li className='nav-item'><a className="nav-link "><Link to='/home'>Home</Link></a></li>
          {/* <li className='nav-item'><a className="nav-link "><Link to='/personal'>Personal</Link></a></li>
          <li className='nav-item'><a className="nav-link "><Link to='/professional'>Professional</Link></a></li> */}
          <li className='nav-item'><a className="nav-link ">Hi,{JSON.parse(localStorage.getItem('qwert')).name}</a></li> &nbsp;&nbsp;&nbsp;&nbsp;
          <li className='nav-item'><button className='btn btn-danger' onClick={(e) => {
            localStorage.clear()
            window.location.href = '/'
          }}>Logout</button></li>
        </ul>

      </div>
      <div className='data'>
        
        <form onSubmit={professional_data}>
        
          <table>
            <tr>
              <td><h1>Professional Preference</h1>
                <span>
                  <input type='url' class="form-control" placeholder="Enter Linkedin URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <input type="text" class="form-control" placeholder="Current Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <input type="text" class="form-control" placeholder="Work Experience" value={data1} onChange={(e) => setData1(e.target.value)} />
                  <button type="button" class="btn btn-primary" onClick={changeHandlerwork}>Add</button>
                </span>
                
              </td>
            </tr>
            <tr><span><td align='left'>
            {work && work.map(work => {
                  return (
                    <h5>{work}<button class="btn"
                    onClick={() => removework(work)}>
                    <i className="fa fa-trash"></i>
                  </button></h5>
                  )
                })}
              </td></span></tr>
            <tr>
              <td>
                <span>
                  <input type="text" class="form-control" placeholder="Enter Skills" value={data} onChange={(e) => setData(e.target.value)} />
                  <button type="button" class="btn btn-primary" onClick={changeHandler}>Add</button>
                </span>
                
              </td>
            </tr>
            <tr>
              <span>
                <td align='left'>
                {skills && skills.map(skill => {
                  return (
                    <h5>{skill}<button class="btn"
                    onClick={() => remove(skill)}>
                    <i className="fa fa-trash"></i>
                  </button></h5>
                  )
                })}

                </td>
              </span>
            </tr>

          </table>
          <div className=''>
            <input type='submit' className='btn btn-success' />

          </div>
        </form>
      </div>
    </div>
  )
}

export default Professional
