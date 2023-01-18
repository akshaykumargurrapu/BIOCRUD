import React, { useContext, useEffect } from 'react';
import { dataContext } from '../nodeContext';
import {Link} from 'react-router-dom';


function Login() {
  const [email, setEmail, password, setPassword] = useContext(dataContext)
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('qwert')))
    localStorage.clear()
  })
  
  async function loginUser(e) {
    e.preventDefault()
    
    const response = await fetch('http://localhost:6969/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    // const response=await axios.post('http://localhost:6969/api/login',{email,password})
    const data = await response.json()
    console.log(data)
    console.log(response)
    console.log(data.token)
    if (data.token) {
      alert("Login Sucessful")
      localStorage.setItem("qwert", JSON.stringify(data))
      if(data.email == "admin@gmail.com" ){
        window.location.href = '/admin'
      }
      else
        window.location.href = "/Home"

    }
    else {
      alert("Please check your email and password")
    }

  }

  return (
    <div>
      <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="email" placeholder="email" className='form-control'
          onChange={(e) => setEmail(e.target.value)} value={email}>
        </input>
        <br></br>
        <input type="password" placeholder="password" className='form-control'
          onChange={(e) => setPassword(e.target.value)} value={password}>
        </input>
        <div className='reg'>
        <Link to='/register'><a >Register here</a> </Link>
        </div>
        <input type="submit" className='btn btn-primary' value="Login" placeholder="Sign In">
        </input>
      </form>
      </div>
    </div>
  );
}

export default Login;
