import './index.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login(){

    // let token = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const [userName, setUserName] = useState();
    const changeUserName = (e) => {
        setUserName(e.target.value);
    }

    const [pass, setPass] = useState();
    const changePass = (e) => {
        setPass(e.target.value);
    }

    const [buttonClicked, setButtonClicked] = useState(false);   

    useEffect ( () => {
        if (buttonClicked){
            const url = `/login?param1=${userName}&param2=${pass}`;
            console.log("hi")

            fetch(url)
                .then (response => response.json())
                .then (result => {
                    if (result != null){
                        window.sessionStorage.setItem("token", result);
                        // console.log(token.current)
                        navigate('/Dashboard', {state: {uname: userName}})
                    }
                        
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }, [buttonClicked, pass, userName] )  

    return(
        <section>
            <div className="formBox"> 
                <div className="formVal">
                    <form action="">
                        <h2>Login</h2>

                        <div className="inputBox">
                            <input type="text" onChange={changeUserName} required/>
                            <label>Username</label>
                        </div>
                        
                        <div className="inputBox">
                            <input type="password" onChange={changePass} required/>
                            <label>Password</label>
                        </div>
                        
                        <button type='button' onClick={ () => setButtonClicked(true) }>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;