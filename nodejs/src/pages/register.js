import React, { useContext  } from 'react';
import { dataContext } from '../nodeContext';
import {Link} from 'react-router-dom'
function Register() {
  const [name, setName, email, setEmail, password, setPassword, hobbies,
     tShirt, height, weight, linkedin, company, skills, work] = useContext(dataContext)

  async function registerUser(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:6969/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        hobbies,
        tShirt,
        weight,
        height,
        linkedin,
        company,
        skills,
        work
      }),
    })
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (data.status === 'ok')
      window.location.href = '/'
    else
      alert("Please check your email and password")
  }

  return (
    <div>
      <div className='form-container'>
      <h1>Registration</h1>
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Firstname" className='form-control'
          onChange={(e) => setName(e.target.value)} value={name}>
        </input>
        <br></br>
        <input type="email" placeholder="email" className='form-control'
          onChange={(e) => setEmail(e.target.value)} value={email}>
        </input>
        <br></br>
        <input type="password" placeholder="password" className='form-control'
          onChange={(e) => setPassword(e.target.value)} value={password}>
        </input>
        <div className='reg1'>
        <Link to='/'><a >Login here</a></Link>
        </div>
        <input type="submit"  className='btn btn-primary' value="Register" placeholder="Register">
        </input>
      </form>
      </div>
    </div>
  );
}

export default Register;
