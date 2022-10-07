import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { resetLocal } from '../lib/actions';

export const Navbar = props => {
    const { authFails } = props;
    const dispatch = useDispatch();
    return(
        <div className="nav">
            <Link to="/">
                <div className="content-start">
                    <img src={`${process.env.PUBLIC_URL} /Icons/collaboration.png`}
                    title="discussion" alt="colaboration" width={40} height={40}/>
                    <span style={{ position: 'absolute', margin : "10px" }}>Desktop chat</span>
                </div>
            </Link>
            <div className={`content-end ${authFails && 'd-none'}`}>
                <ul>
                    <Link to="/login">
                        <li>Se connecter</li>
                    </Link>
                    <Link to="/register">
                        <li>S'inscrire</li>
                    </Link>
                </ul>
            </div>
            <div className={`content-end ${!authFails && 'd-none'}`}>
                <ul>
                    <Link to="/" onClick={()=> {
                            dispatch(resetLocal());
                        }
                    }>
                    <li>Déconnexion</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}