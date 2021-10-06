import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/Header.css';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createNewPost } from '../reducers/generalReducer';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const openMenu = () => {
    var x = document.getElementById('myTopnav');
    if (x.className === 'nav__links') {
      x.className += ' responsive';
    } else {
      x.className = 'nav__links';
    }
  };

  
  return (
    <header>
      <i className='fa fa-commenting logoHeader' onClick={() => history.push('/')}></i>
      
      <nav>
        <ul className='nav__links' id='myTopnav'>
          <li>
            <Link to='/create/post'>Publicar post</Link>
          </li>
          <li>
            <div className='dropdown'>
              <div className='dropbtn'>
                Opciones
                <i className='fa fa-caret-down'></i>
              </div>
              <div className='dropdown-content'>
                <Link to='#'>Mi perfil</Link>
                <Link to='#'>Mensajes</Link>
                <Link to='#'>Grupos</Link>
              </div>
            </div>
          </li>
          <li className='icon' onClick={openMenu}>
            <i className='fa fa-bars'></i>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
