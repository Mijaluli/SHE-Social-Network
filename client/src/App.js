import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import  Home  from './components/screens/Home';
import  Login  from './components/screens/Login';
import  Signup  from './components/screens/Signup';
import  Profile  from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import {initialState,reducer} from './components/reducers/userReducer'

    export const UserContext=createContext()
    const Routing=()=>{
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      //we are not geting access to the state but directly to the local storage
      //"user" is a json
      if(user){
        dispatch({type:"USER",payload:user})
      }else{
        history.push("/login")
      }
    },[])
    return(
    <Switch>
        <Route exact path='/'>
          <Home/>
      </Route>
      <Route path='/login'>
          <Login/>
      </Route>
      <Route path='/signup'>
          <Signup/>
      </Route>
      <Route path='/profile'>
          <Profile/>
      </Route>
      <Route path='/createpost'>
          <CreatePost/>
      </Route>
    </Switch>
    )
  }

  function App() {
    const[state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
