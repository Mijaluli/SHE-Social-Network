import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar=()=>{
const {state,dispatch}=useContext(UserContext)
const history=useHistory()
const renderList=()=>{
  if (state)
  {
    return(
      <div>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Create Post</Link></li>
        <li>
          <button className="btn waves-effect lightslategray waves-light" 
          type="submit" name="action"
          onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/login')
          }}>Log Out
          </button>
        </li>
      </div>
    )
  }
  else 
  {
    return(
      <div>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </div>
    )
  }
}
return( <nav>
<div className="nav-wrapper navbar">
<Link to={state?"/":"/signup"} className="brand-logo title">Socially</Link>
  <ul id="nav-mobile" className="right hide-on-med-and-down">
    {renderList()}
  </ul>
</div>
</nav>)
}

export default NavBar
