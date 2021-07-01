import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

const CreatePost=()=>{
const [title,setTitle]=useState("")
const [body,setBody]=useState("")
const [image,setImage]=useState("")
const [url,setUrl]=useState("")
const history=useHistory()

useEffect(()=>{
    if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify(
                {
                    title,
                    body,
                    img:url
                }
            )
            }).then(res=>res.json()).then(data=>{
            if(data.error){
                    M.toast({html:data.error, classes:"#e53935 red darken-1"})
            }else{
                    M.toast({html:"created post successfully", classes:"#8bc34a light-green"})
                    history.push("/")
                }
            }).catch(err=>{
                console.log(err)
            })
    }
},[url])//if there is a change in the url check again
const postData =()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","socialnetwork")
    data.append("cloud_name","sociallynetwork")
    fetch("https://api.cloudinary.com/v1_1/sociallynetwork/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>{console.log(err)})

}
    return(
        <div className="card input-file"
            style={{
                margin:"10px auto",
                maxWidth:"500px",
                padding:"20px",
                textAlign:"center"
            }}>
            <input type="text" placeholder="Title" value={title}
                     onChange={(e)=>{
                        setTitle(e.target.value)
            }}/>
            <input type="text" placeholder="Description" value={body}
                     onChange={(e)=>{
                        setBody(e.target.value)
            }}/>
            <div className="file-field input-field">
                <div className="btn waves-effect waves-light">
                    <span>Upload Image</span>
                    <input type="file"
                    onChange={(e)=>{
                        setImage(e.target.files[0])
                     }}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light"
            onClick={()=>postData()}>
                Post
            </button>
        </div>
    )
};
export default CreatePost;