import React, { useState,useEffect, useContext } from 'react'
//import {UserContext} from '../../App'

const Home =()=>{
    
    const [data,setData]=useState([])
    //const {state,dispatch}=useContext(UserContext)

    useEffect(()=>{
        fetch('/allPosts',{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
          .then(result=>{
            setData(result)
            }
        ).catch(err=>{
            console.log(err)
        })
    },[])
    // const likePost= (id)=>{
    //     fetch('/like',{
    //         method:"put",
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":"Bearer "+ localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId:id
    //         })
    //     })
    //     .then(res=>res.json())
    //     .then(result=>{
    //         const newData=data.map(item=>{
    //             if(item._id===result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //     }).catch(error=>{
    //             console.log(error);
    //         })
    // }
    // const unlikePost= (id)=>{
    //     fetch('/unlike',{
    //         method:"put",
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":"Bearer "+ localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId:id
    //         })
    //     }).then(res=>res.json())
    //         .then(result=>{
    //             const newData=data.map(item=>{
    //                 if(item._id==result._id)
    //                     return result
    //                 else
    //                     return item
    //             })
    //           setData(newData)
    //         }).catch(error=>{
    //             console.log(error);
    //           }
    //     )
    // }
    
    return(
        <div className="home">
            {data.map(item=>{
            return(
                <div className="home-card" key={item._id}>
                    <h5>{item.postedby.name}</h5>
                    <div className="card-image">
                        <img alt="" src={item.photo}/>
                    </div>
                    <div className="card-content">
                        {/* {item.likes.includes(state._id)?
                        <i className="material-icons" onClick={()=>{
                            unlikePost(item._id)
                        }}>thumb_down</i>
                        :
                        <i className="material-icons" onClick={()=>{
                            likePost(item._id)
                        }}>thumb_up</i>
                        } */}
                        
                        {/*<h6>{item.likes.length} likes</h6>*/}
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        <input type="text" placeholder="Add a comment"/>
                    </div>
                </div>
            )})}
        </div>
    )
};
export default Home;