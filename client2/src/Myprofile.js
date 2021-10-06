import React,{ useContext,useState,useEffect} from 'react';
import { Redirect } from 'react-router';
import { store } from './App';
import axios from 'axios';

const Myprofile = () => {

    const [token,setToken] = useContext(store);

    const [data,setData] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:5000/myprofile',{
            headers:{
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err)=> console.log(err))
    },[])

    if(!token){
        return <Redirect to='/login'/>
    }
    return (
        <div>
            {
                data &&
            
            <center>
               <h1> Welcome to user : { data.username}</h1>

               <button onClick={()=>{setToken(null)}}>LogOut</button>
            </center>
            }
        </div>
    )
}

export default Myprofile
