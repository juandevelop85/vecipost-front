import React from 'react';
// import '../assets/styles/Home.css';
import { useHistory, Link } from 'react-router-dom';
import Logo from '../assets/images/masEmpleo.svg';

export default function NotFound() {
  const history = useHistory();

  const navigate = (route, replace) => {
    if (replace) {
      // router.replace(route);
      history.push(route);
    } else {
      // router.push(route);
      history.push(route);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 center wrap'>
          <h5>Esta página no existe. Trata hacer otra búsqueda.</h5>
          <Link className='go__to__login' to='/'>REGRESAR</Link>
        </div>
      </div>
    </div>
  );
}
