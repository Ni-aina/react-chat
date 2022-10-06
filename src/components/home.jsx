import React from 'react';
import Lottie from 'lottie-react';
import lets_chat from '../lotties/lets-chat.json';
import communication from '../lotties/communication.json';

export const Home = ()=> {
    const style = {
      height: 450
    }
    return (
      <div className="flex">
        <div className="card border-white">
          <Lottie 
              animationData={communication}
              style={style}
            />
        </div>
        <div className="card border-white">
          <span style={{ display: 'block', margin: '-80px 0px' }}>
            <Lottie 
                animationData={lets_chat}
                style={style}
              />
            </span>
          <h1>Veuillez-vous connecter ou vous inscrire</h1>
        </div>
      </div>
    );
}