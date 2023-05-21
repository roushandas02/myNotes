import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { BACKEND_URL } from './BackendLink'

const Login = (props) => {
    // const host="http://localhost:5000"
    const host=`${BACKEND_URL}`
    const [credentials, setCredentials]=useState({email:"", password:""})
    const navigate=useNavigate();
    

    const handleSubmit = async(e) => {
       e.preventDefault();
       const response= await fetch(`${host}/api/auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}) 
      });
      const json= await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken)//stores the authtoken in localstorage (retrived in Notes.js)
            navigate("/")
            props.showAlert("logged in successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange=(e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <h1 class="text-center my-5">Log In to myNotes</h1>
        <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
          </div>
          
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Login
