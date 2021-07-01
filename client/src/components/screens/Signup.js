import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup =()=>{

const history=useHistory()
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const postData=()=>{
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
        M.toast({html:"Invalid Email ID",classes:"#e53935 red darken-1"})
        return
    }
    fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    name:name,
                    email:email,
                    password:password
                }
            )
    }).then(res=>res.json()).then(data=>{
            if(data.error){
                    M.toast({html:data.error, classes:"#e53935 red darken-1"})
            }else{
                    M.toast({html:data.message, classes:"#8bc34a light-green"})
                    history.push("/login")
                }
    }).catch(err=>{
        console.log(err)
    })
}
    return(
        <div className="mycard">
            <div className ="card auth-card">
                <h3>Socially</h3>
                <input type="text" placeholder="Name" value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
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
                className="btn waves-effect waves-light" type="submit" name="action">Signup
                    <i className="material-icons right">send</i>
                </button> 
                <br/><br/>
                <h7><Link to= "/login">Already have an account?</Link></h7>          
            </div>
        </div>
    )
};
export default Signup;