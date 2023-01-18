import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { dataContext } from '../nodeContext';
import { Link } from 'react-router-dom'


const Personal = () => {
  const [food, setFood] = useState('')

  const [hobbies, setHobbies, tShirt, settShirt,
    height, setHeight, weight, setWeight] = useContext(dataContext);
    useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('personaldata'))
    console.log(data)
    setHobbies(data.hobbies)
    settShirt(data.tShirt)
    setWeight(data.weight)
    setHeight(data.height)

    },[])



  const changeHandler = (e) => {
    setHobbies([...hobbies, food]);
  }


  async function personal_data(e) {
    const items = JSON.parse(localStorage.getItem('qwert'))
    const email = items.email
    const token = items.token
    e.preventDefault()
    let body={token,
      email,
      hobbies,
      tShirt,
      weight,
      height}
    Object.keys(body).forEach(key =>{console.log('asd') 
    if(body[key]===''){delete body[key]}})

    const response = await fetch('http://localhost:6969/api/personadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    console.log(data)
    if (data.status === 'ok')
      alert("Updated Data")
    else
      alert("Error")
    window.location.href = '/Home'
  }

  const remove = (item) => {
    console.log(item)
      let filteredArr = hobbies.filter((e) => e !== item);
      console.log(filteredArr)
      setHobbies(filteredArr)

    }

  const renderhobbies = hobbies && hobbies.map(hobbie =>{
    return(
      <>
      <h5>{hobbie}<button class="btn"  
      onClick={()=> remove(hobbie)}>
        <i className="fa fa-trash"></i>
        </button></h5>
        </>
    )
  })

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
        <h1>Personal Preference</h1>
        <form onSubmit={personal_data}>
          <table>

            <tr>
              <td>
                <span>
                  <select type="text" class="form-control" placeholder="Enter TShirt Size" value={tShirt} onChange={(e) => settShirt(e.target.value)} >
                    {/* <option>default</option> */}
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>

                  </select>

                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <input type="number" class="form-control" placeholder="Enter Height" value={height} onChange={(e) => setHeight(e.target.value)} />
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <input type="number" class="form-control" placeholder="Enter Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  <input type="text" class="form-control" placeholder="Enter Food Habits" value={food} onChange={(e) => setFood(e.target.value)} />
                  <button type="button" class="btn btn-primary" onClick={changeHandler}>Add</button>
                </span>
                
              </td>
            </tr>
            <tr>
              <span><td align='left'>{renderhobbies}
              </td></span>
            </tr>
          </table>
          <div className='btnn'>
            <button type='submit' className='btn btn-success' >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Personal;
