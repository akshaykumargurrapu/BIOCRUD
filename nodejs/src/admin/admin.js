import {React, useEffect, useState} from "react";
import { dataContext } from '../nodeContext';
import { useContext } from 'react';

const Admin =()=>{

  function isadmin(){
    const user = JSON.parse(localStorage.getItem('qwert'))
    if (user==null || user.email!=='admin@gmail.com')
      window.location.href='/error'  
  }
  useEffect(()=>{
    isadmin()
  })



  const [tShirt, settShirt,
    height, setHeight, weight, setWeight, company, setCompany, 
    skills, setSkills, work, setWork] = useContext(dataContext);
 const [data1, setData1] = useState([])

    async function finduserspersonaldata(e){
        e.preventDefault()
        let body={height , weight, tShirt}
        console.log(body)
        // body=Object.keys(body).filter(item=>body[item]!=='' && delete body[item])
        // console.log(body)
        Object.keys(body).forEach(key =>{console.log('asd') 
        if(body[key]===''){delete body[key]}})
        console.log(body)
        const response = await fetch('http://localhost:6969/api/finduserpersonaldata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    const data =await response.json()
    setData1(data.user)
}


async function findusersprofessionaldata(e){
    e.preventDefault()
    let body={work, skills, company}
    Object.keys(body).forEach(key =>{console.log('asd') 
        if(body[key]===''){delete body[key]}})
        console.log(body)
    const response = await fetch('http://localhost:6969/api/findusersprofessionaldata', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body),
})
const data =await response.json()
setData1(data.user)
}


const renderuser = data1 && data1.map(user=>{
    console.log(user)
    return(   
    <h1>{user.email}</h1>
    )
})

    return(
        <div className="main">
        <div className='navbar'>
        <h1>Admin Page</h1>
        <ul className='nav'>
          <li className='nav-item'><button className='btn btn-danger' onClick={(e) => {
            localStorage.clear()
            window.location.href = '/'
          }}>Logout</button></li>

        </ul>

      </div>

    <div className="form">
    
    <table>
        <tr>
            
            
        </tr>
        <tr>
            <td>
            <th>
                Personal Data
            </th>
                <form onSubmit={finduserspersonaldata}>
                    <input type="text" placeholder="Height" className="form-control"  value={height} onChange={(e)=>{setHeight(e.target.value)}} >
                    </input>
                    <input type="text" placeholder="Weight" className="form-control"  value={weight} onChange={(e)=>{setWeight(e.target.value)}} >
                    </input>
                    <input type="text" placeholder="TShirt" className="form-control"  value={tShirt} onChange={(e)=>{settShirt(e.target.value)}} >
                    </input>
                    {/* <input type="text" placeholder="hobbies" value={hobbies} onChange={(e)=>{setHobbies([e.target.value])}} >
                    </input> */}
                    <br></br>
                    <input type='submit' className="btn btn-primary"></input>
                </form>
                
            </td>
            
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <td>
            <th>
                Professional Data
            </th>
            <form onSubmit={findusersprofessionaldata}>
                    <input type="text" placeholder="Company" className="form-control"  value={company} onChange={(e)=>{setCompany(e.target.value)}} >
                    </input>
                    <input type="text" placeholder="Work" className="form-control"  value={work} onChange={(e)=>{setWork(e.target.value)}} >
                    </input>
                    <input type="text" placeholder="Skill" className="form-control"  value={skills} onChange={(e)=>{setSkills(e.target.value)}} >
                    </input>
                    <br></br>
                    <input type='submit' className="btn btn-primary"></input>
                </form>
            </td>
        </tr>

    </table>
    {
                renderuser
            }
    </div>
    </div>
    )
}

export default Admin;