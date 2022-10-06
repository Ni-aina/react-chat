import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Lottie from 'lottie-react';
import animationData from '../lotties/login.json';
import { useNavigate } from 'react-router-dom';
import { authentification, authentificationId } from '../lib/actions';
import { useDispatch } from 'react-redux';

export const Login = props => {
  const { authFails } = props;
  const [isUser, setIsUser] = useState(false);
  const [isNotPassword, setIsNotPassword] = useState(true);
  const dispatch = useDispatch();
  const style = {
    margin: "auto",
    height: 465
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmit = ()=> {
    Axios.post('http://localhost:3001/api/login', {
      email: email,
      password: password
    }).then((response)=> {
      dispatch(authentification(response.data.isAuth));
      dispatch(authentificationId(response.data.id));
      document.getElementById('passwordId').value = "";
      switch(response.data.isAuth) {
        case "Email introuvable": setIsUser(true);
          break;
        case true: {
            setIsUser(false);
            setIsNotPassword(true);
            break;
          }
        case false: {
            setIsUser(false);
            setIsNotPassword(false);
            break;
          }
        default: return;
      }
    })
  } 
  useEffect(()=> {
    if (authFails)
      navigate('/chat');
  })
  return (
    <div className="flex">
      <Lottie
        animationData={animationData}
        style={style}
      />
      <div className="card">
        <h1>Connexion</h1>
        <input type="email" className="input-form" placeholder="E-mail" name="email" id="emailId" onChange={(e)=>{
            setIsUser(false);
            setEmail(e.target.value)
          }
        } required/>
        <p style={{ marginLeft: 45, marginTop: -15, fontSize: 12, color: 'red' }} className={`${!isUser && 'd-none'}`}>Email invalide!</p>
        <input type="password" className="input-form" placeholder="Mot de passe" name="password" id="passwordId" onChange={(e)=>{
            setIsNotPassword(true);
            setPassword(e.target.value)
          }
        }/>
        <p style={{ marginLeft: 45, marginTop: -15, fontSize: 12, color: 'red' }} className={`${isNotPassword && 'd-none'}`}>Mot de passe incorrect!</p>
        <button type="submit" className="form-button" onClick={()=>onSubmit()}>Se connecter</button>
      </div>
    </div>
  );
}