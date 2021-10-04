import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/Header.css';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { get } from '../api/client';
import { removeAllCookies, isLogin, getCookie } from '../api/session';
import Logo from '../assets/images/masEmpleo.svg';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.counter);
  console.log('state', state);
  const [show, setShow] = useState(false);

  // if (!isLogin()) {
  //   return null;
  // }

  const navigate = (route, replace) => {
    if (replace) {
      // router.replace(route);
      history.push(route);
    } else {
      // router.push(route);
      history.push(route);
    }
  };

  const closeSesion = () => {
    removeAllCookies();
    navigate('/', true);
  };

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
      <img src={Logo} width='10%' className='logoHeader' />
      <nav>
        <ul className='nav__links' id='myTopnav'>
          <li>
            <Link to='/menu'>Publicar post</Link>
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
