import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useSelector } from 'react-redux';

export const Chat = ({ authFails })=> {
    const isAuth = useSelector(state => state.items);
    const authId = isAuth[1].authId;
    const [allUser, setAllUser] = useState([]);
    const [data, setData] = useState([]);
    const [insertMessage, setInsertMessage] = useState();
    const [userIdClick, setUserIdClick] = useState();
    const [userNameClick, setUserNameClick] = useState();
    const [isOnClick, setIsOnClick] = useState(false);
    const [isSearchUser, setIsSearchUser] = useState(false);
    const [isSearchMessage, setIsSearchMessage] = useState(false);
    const navigate = useNavigate();
    const getMessage = (userIdClik, userNameClick) => {
        setIsOnClick(true);
        document.getElementById("user-click").innerHTML = userNameClick;
        Axios.put(`http://localhost:5000/api/get/messages/${authId}`, {userIdClick: userIdClik}).then(
            (response)=> {
                setUserIdClick(userIdClik);
                setUserNameClick(userNameClick);
                if (isSearchMessage) {
                    const all = response.data.result.flat();
                    const messageSearch = document.getElementById('idSearch-message').value.toLowerCase();
                    const res = all.filter(message => message.message.toLowerCase().indexOf(messageSearch)>-1);
                    setData(res);
                }
                else
                    setData(response.data.result);
        })
    }
    const SetMessage = ()=> {
        document.getElementById('input_sms_id').value = "";
        Axios.put(`http://localhost:5000/api/insert/message/${authId}`, {userIdClick: userIdClick, insertMessage: insertMessage}).then(
                ()=> {
                getMessage(userIdClick, userNameClick);
            }
        )
    }
    useEffect(()=> {
        if (!authFails) {
            navigate('/');
        }
        Axios.get(`http://localhost:5000/api/get/allUser/${authId}`).then(response => {
            if (isSearchUser) {
                const all = response.data.flat();
                const name = (document.getElementById('idSearch-user').value).toLowerCase();
                const res = all.filter(user => user.name.toLowerCase().indexOf(name)>-1);
                setAllUser(res);
            }
            else {
                setAllUser(response.data);
            }
            const id = response.data[0].id, name = response.data[0].name;
            if (!isOnClick) {
                getMessage(id, name);
            }
        })
    })
    return(
        <div className="flex">
            <div className="left-col">
                <input type="search" name="search" id="idSearch-user" placeholder="recherche"
                onChange={e => {
                        if (e.target.value.length)
                            setIsSearchUser(true);
                        else
                            setIsSearchUser(false);
                    }
                }/>
                <img src={process.env.PUBLIC_URL + `/Images/user.jpg`} alt="user.name" width={150} height={150}
                className="img-center"/>
                <p>Messagerie</p>
                <ul>
                    { allUser.map(user => (
                                <li key={user.id} onClick={()=> {
                                        document.getElementById('idSearch-message').value = "";
                                        getMessage(user.id, user.name);  
                                    }
                                }>
                                    <img src={process.env.PUBLIC_URL + `/Icons/user.png`} alt={user.name} width={30} height={30} />
                                    <span>{ user.name }</span>
                                </li>
                            )
                            )
                    }
                </ul>
            </div>
            <div className="right-col">
                <img src={process.env.PUBLIC_URL + `/Icons/user.png`} alt='' width={30} height={30}/>
                <span>
                    <strong id="user-click"></strong>
                    <input type="search" name="search" id="idSearch-message" placeholder="recherche"
                    onChange={e =>{
                            if (e.target.value.length)
                                setIsSearchMessage(true);
                            else
                                setIsSearchMessage(false);
                            getMessage(userIdClick, userNameClick)
                        }
                    }/>
                </span>
                <hr style={{ color: '#F4FFFF', clear: 'both'}}/>
                <ul>
                    { data.map(sms => {
                            if(sms.user_id===authId)
                                return <li key={sms.id} className="right-sms">{ sms.message }</li>
                            else
                                return <li key={sms.id} className="left-sms">{ sms.message }</li>
                            }
                        )
                    }
                </ul>
                <input type="" name="message" id="input_sms_id" placeholder="Message ... "
                onChange={(e)=>setInsertMessage(e.target.value)}/>
                <button className="btn-primary" onClick={()=>SetMessage()}>Envoyer</button>
            </div>
        </div>
    )
}