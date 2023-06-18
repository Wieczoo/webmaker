//import libraries
import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
//import styles
import '../styles/forms.css';
//import assets
import icon_avatar from '../assets/user.png';
import icon_password from '../assets/lock.png';
import ilustration from '../assets/loginIlustration.jpg';
import icon_google from '../assets/google.png';
import icon_facebook from '../assets/facebook.png';
import icon_instagram from '../assets/instagram.png';
const LoginPage = () =>
{
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const API_URL = "https://localhost:7298/api/Authentication/login";

    const login = ()=> {

    }
    return(
        <div className="form">
            <div className="formRow">
                <div className="formRowColumn">
                    <img id="ilustration" alt="ilustration" src={ilustration}/>
                </div>
                <div className="formRowColumn">
                    <h2>Login Panel</h2>
                    <span><img src={icon_avatar} alt='user'/><input type='text' placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/></span>
                    <span><img src={icon_password} alt='user'/><input type='password' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/></span>
                    <span><button onClick={login}>Login</button></span>
                </div>
            </div>
            <div className="formRow">
                <div className="formRowColumn">
                    <a className="link" onClick={()=>{navigate('register');}}>Create an account</a>
                </div>
                <div className="formRowColumn">
                    <span>
                        <a>or login with:</a>
                        <img className='iconMedia' src={icon_facebook} alt='facebook'></img>
                        <img className='iconMedia' src={icon_instagram} alt='instagram'></img>
                        <img className='iconMedia' src={icon_google} alt='google'></img>
                        </span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;