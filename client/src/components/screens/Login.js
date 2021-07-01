import React, { useState,  useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'


const Login =()=>{

    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const postData=()=>{
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
        M.toast({html:"Invalid Email ID",classes:"#e53935 red darken-1"})
        return
    }
    fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    email,
                    password
                }
            )
    }).then(res=>res.json()).then(data=>{
            if(data.error){
                    M.toast({html:data.error, classes:"#e53935 red darken-1"})
            }else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html:"Logged in successfully ", classes:"#8bc34a light-green"})
                    history.push("/")
                }
    }).catch(err=>{
        console.log(err)
    })
}
    return(
        <div className="mycard">
            <div className ="card auth-card">
                <h3>Socially</h3>
                <input type="text" placeholder="Email" value={email}
                     onChange={(e)=>{
                        setEmail(e.target.value)
                     }}/>
                <input type="password" placeholder="Password" value={password}
                     onChange={(e)=>{
                        setPassword(e.target.value)
                     }}/>
                <br/><br/>
                <button 
                onClick={()=>
                    postData()
                }
                className="btn waves-effect waves-light" type="submit" name="action">Login
                    <i className="material-icons right">send</i>
                </button>
                <br/><br/>
                <h7><Link to= "/signup">Don't have an account?</Link></h7>         
            </div>
        </div>
    )
};
export default Login;