import React, { useState } from 'react';
import Axios from 'axios';
import Lottie from 'lottie-react';
import animationData from '../lotties/register.json';
import { useNavigate } from 'react-router-dom';

export const Register = ()=> {
  const style = {
    margin: "auto",
    height: 450
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExist, setEmailExist] = useState(true);
  const navigate = useNavigate();
  const onSubmit = ()=> {
    Axios.post('https://back-node-chat.herokuapp.com/api/insert/user', {
      name: name,
      email: email,
      password: password
    }).then((response)=> {
      document.getElementById('passwordId').value = "";
      if (response.data.save) {
        document.getElementById('nameId').value = "";
        document.getElementById('emailId').value = "";
        navigate('/login');
      }
      else setEmailExist(false);
    });
  }
  return (
    <div className="flex">
      <Lottie
        animationData={animationData}
        style={style}
      />
      <div className="card">
        <h1>S'inscrire</h1>
        <input type="text" className="input-form" placeholder="Nom" name="name" id="nameId" onChange={(e)=>setName(e.target.value)}/>
        <input type="email" className="input-form" placeholder="E-mail" name="email" id="emailId" onChange={(e)=>{
            setEmail(e.target.value)
            setEmailExist(true);
          }
        }/>
        <p style={{ marginLeft: 45, marginTop: -15, fontSize: 12, color: 'red' }} className={`${emailExist && 'd-none'}`}>cette adresse e-mail existe déjà!</p>
        <input type="password" className="input-form" placeholder="Mot de passe" name="password" id="passwordId" onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit" className="form-button" onClick={()=>onSubmit()}>Enregistrer</button>
      </div>
    </div>
  );
}