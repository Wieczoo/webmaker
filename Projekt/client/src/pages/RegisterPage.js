//import libraries
import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
//import styles
import '../styles/forms.css';
//import assets
import icon_avatar from '../assets/user.png';
import icon_password from '../assets/lock.png';
import ilustration from '../assets/loginIlustration.jpg';

const RegisterPage = () =>
{
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [rePassword,setRePassword] = useState();


    const register = ()=> {

    }
    return(
        <div className="form">
            <div className="formRow">
                <div className="formRowColumn">
                    <img id="ilustration" alt="ilustration" src={ilustration}/>
                </div>
                <div className="formRowColumn">
                    <h2>Register Panel</h2>
                    <span><img src={icon_avatar} alt='user'/><input type='text' placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/></span>
                    <span><img src={icon_password} alt='password'/><input type='password' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/></span>
                    <span><img src={icon_password} alt='password'/><input type='password' placeholder="Again password" onChange={(e)=>{setRePassword(e.target.value)}}/></span>
                    <span className="agreement"><input type='checkbox'/><a>I agree</a></span>
                    <span><button onClick={register}>Register</button></span>
                </div>
            </div>
            <div className="formRow">
                <div className="formRowColumn">
                    <a className="link" onClick={()=>{navigate('/');}}>Return to Login Panel</a>
                </div>
                <div className="formRowColumn">
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;