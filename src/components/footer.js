import React from 'react';
import '../assets/styles/Footer.css';
import SpinnerApp from './spinnerApp';

function Footer() {
  const [style, setStyle] = React.useState({ height: '202px', marginTop: '0px' });
  return (
    <>
      <div className='footer' id='parent'>
        <div className='row center full' id='child'>
          <SpinnerApp />
        </div>
      </div>
    </>
  );
}

export default Footer;
