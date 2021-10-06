import React from 'react';
import { useSelector } from 'react-redux';
import { isLoading, setIsLoading } from '../reducers/generalReducer';

function SpinnerApp() {
  const loading = useSelector(isLoading);

  if (!loading) {
    return null;
  }
  return (
    <div className='spinnerContainer'>
      <div className='loader'></div>
      <label>Cargando...</label>
    </div>
  );
}

export default SpinnerApp;
