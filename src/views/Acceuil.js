import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import Card from './Component-Card/Card'

function Accueil() {

    return (
        <>
        <div className='Title'>
            <h1>Bienvenue sur Paris Events<div className='trait'></div></h1>
            <p className='dscrp'>L'application qui permet de rechercher en direct les prochains événements Parisiens</p>
            <div className='trait-prime'></div>
        </div>
        <Card/>
        </>
    );
}

export default Accueil;


