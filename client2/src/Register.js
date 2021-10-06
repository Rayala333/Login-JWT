import React, { useState } from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';


const Register = () => {
    const [data, setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:'',
    })

    const changeHandler = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(
            (res)=>{
                alert(res.data)
                    },
            (err)=>{
                alert('Registation Fail')
            }
        )
    }
    return (
        <div >
            <center>
            <form onSubmit = {submitHandler} className="form" autoComplete="off">
                             <h2>USER REGISTER</h2>
                <input type="text" onChange={changeHandler} name="username" placeholder="User Name"/>
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password"/>
                <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password"/>
                <input type="submit" value="Register"/>
                <Link to='/login'><input type="submit" value="Login"/></Link>
            </form>
            </center>
            
           
        </div>
    )
}

export default Register
