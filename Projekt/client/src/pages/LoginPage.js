//import libraries
import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
//import styles
import '../styles/forms.css';
//import assets
import icon_avatar from '../assets/user.png';
import icon_password from '../assets/lock.png';
import ilustration from '../assets/loginIlustration.jpg';
import jwt_decode from 'jwt-decode';
import icon_google from '../assets/google.png';
import icon_facebook from '../assets/facebook.png';
import icon_instagram from '../assets/instagram.png';
import axios from "axios";
const LoginPage = () =>
{
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const API_URL = "https://localhost:7298/api/Authentication/login";

    const login = ()=> {
        console.log("NET:")
        axios.post(API_URL, {
          "email": username,
          "password":password
        })
        .then(response => {
          console.log(response);
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data));
            const decoded = jwt_decode(response.data,{header: false});
            debugger;
            localStorage.setItem("token", decoded);
            if( decoded.Role == 'User') {
              navigate('dashboard');
            } else if (decoded.Role == 'Admin'){
              navigate('dashboard');
            }
          }
  
          return response.data;
        }).catch((e) =>{
            console.log(e)
        });
    }
    

//https://localhost:7298/api/Authentication/Users
    function handleCallbackResponse(response){
        //console.log("Token:" + response.credential)
        
        console.log("Token:" + response.credential)
        const decodeToken = jwt_decode(response.credential,{header: false});
       
        console.log(decodeToken)
        axios.post("https://localhost:7298/api/Authentication/Users",{
            Id: 0,
            Email: decodeToken.email,
            Password: null,
            FirstName: decodeToken.given_name,
            LastName: decodeToken.family_name,
            Role: null,
        }).then(response => {
            console.log(response);
            if (response.data.token) {
              localStorage.setItem("token", JSON.stringify(response.data.token));
              const decoded = jwt_decode(response.data.token,{header: false});
              debugger;
              localStorage.setItem("role", decoded.Role);
              localStorage.setItem("email", decoded.Email);
              if( decoded.Role == 'User') {
                navigate('dashboard');
              } else if (decoded.Role == 'Admin'){
                navigate('dashboard');
              }
            }
            return response.data;
          });
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const decoded = jwt_decode(token);
            if( decoded.Role == 'User') {
               // navigate('user');
            } else if (decoded.Role == 'Admin'){
              //  navigate('dashboard');
            }
        }
        /* global google */
        google.accounts.id.initialize({
            client_id: "396681354957-blcgk4ism4i4p9bj01rml8jlk4dusdhk.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInByGoogle"),{theme: 'outline',size: 'large'}
        );
    },[]);
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
                    <div id="signInByGoogle"></div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;