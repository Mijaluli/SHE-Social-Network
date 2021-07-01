import React, { useContext, useEffect, useState } from 'react'
import profilePic from '../../images/profilePic.PNG'
import {UserContext} from "../../App"

const Profile =()=>{
    const[photos,setPhotos]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/myPost',{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
          .then(result=>{
            setPhotos(result.mypost)
        })
    },[])
    return(
        <div style={{
            maxWidth:"550px",
            margin:"0px auto"
        }}>
            <div style={{
                 display:"flex",
                 justifyContent: "space-around",
                 margin: "18px 0px",
                 borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style ={{width:130, height:130, borderRadius:"70px"}} 
                    src={profilePic}
                    alt=""/>
                </div>
                <div>
                    <h4>{state?state.name:"loading..."}</h4>
                    <div style={{
                        display:"flex",
                        justifyContent: "space-around",
                        width:"108%"
                    }}>
                        <h6>30 posts </h6>
                        <h6>40 follwers </h6>
                        <h6>45 following </h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    photos.map(item=>{
                        return(
                            <img key={item._id} className="item" alt="" src={item.photo}/>
                        )
                    })
                }
                    
                    
                </div>
        </div>
    )
};

export default Profile;
