import React,{ useState } from "react";
//import { Navigate } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom"

const Login=()=>{

 
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const loginUser=async(e)=> {
    e.preventDefault();
    
   const res=await fetch('/login', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       email:email,
       password:password
     })
  
   })
   const data =res.json();
   console.log(JSON.stringify(data));
  
  if(res.status===201){
       window.alert("Login successful");
       navigate('/userProfile')
   
  } else if(res.status===400||!data)
  window.alert("Invalid credentials")
  
  }
    return(
        <div>
      <h1 className="text-center mt-4">Log In</h1>

      <div className="container">
        <form>
          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button type="submit" class="btn btn-primary  m-4" onClick={loginUser}>
              Login
            </button>
          </div>
          <div className="text-center">
            <p>New User?</p>  
            <button class="btn btn-primary  m-4" onClick={()=>navigate('/')}>
             Register
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default Login;