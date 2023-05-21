import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { BACKEND_URL } from './BackendLink'

const Signup = (props) => {
    // const host="http://localhost:5000"
    const host=`${BACKEND_URL}`
    const [credentials, setCredentials]=useState({name:"", email:"", password:"", cpassword:""})
    let navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name,email,password}= credentials;
        const response= await fetch(`${host}/api/auth/createuser`,{
            
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYzY2NDMzODE3OTNhMGZmNzVlMjhiIn0sImlhdCI6MTY4MTY4MjA3OX0.By4l14WBbRO1cR3H1W2nx9VmwfHOb8TUUlKw4t8Rhok"
         },
         body: JSON.stringify({name, email, password}) 
       });
       const json= await response.json();
         console.log(json);
         if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Successfully Created your account", "success")
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
        <h1 class="text-center my-5">Create your myNotes account now</h1>
        <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" onChange={onChange}  id="name" name="name" aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" onChange={onChange}  id="email" name="email" aria-describedby="emailHelp" required/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={onChange} id="password" name="password" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" required/>
          </div>
          
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Signup
