import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { store } from './App';
import { Redirect } from 'react-router';

const Login = () => {

    const [token,setToken] = useContext(store)

    const [data, setData] = useState({
        email:'',
        password:'',
    })

    const changeHandler = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
            (res)=>{
                 setToken(res.data.token)
                    },
            (err)=>{
                alert('Login Fail')
            }
        )
    }

    if(token){
        return <Redirect to='/myprofile'/>
    }

    return (
        <div >
            <center>
            <form onSubmit = {submitHandler} className="form" autoComplete="off">
                             <h2>USER LOGIN</h2>

                <input type="email" onChange={changeHandler} name="email" placeholder="Email"/>

                <input type="password" onChange={changeHandler} name="password" placeholder="Password"/>
                
                <input type="submit" value="Login"/>

                <Link to='/register'><input type="submit" value="Register"/></Link>
            </form>
            </center>
        </div>
    )
}

export default Login;
