import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import './App.css';


const Nav = () => {

        const [token,setToken] = useContext(store)

    return (
        <div>
            
            <ul className="navbar">

                <div className="navhader"> <h3>Royal.com</h3> </div>
                {!token &&   
                <div >
                    <Link to='/register' className="nav"><li>Rigister</li></Link>
                    <Link to='/login' className="nav"><li>Login</li></Link>
                </div>
                }
            </ul>
            
        </div>
    )
}

export default Nav;
