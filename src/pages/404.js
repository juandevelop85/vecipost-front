import React from 'react';
import { useHistory, Link } from 'react-router-dom';

export default function NotFound() {
  
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
