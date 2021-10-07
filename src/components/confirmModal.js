import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/styles/confirmModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCookie } from '../api/session';
import { confirmModalData, setConfirmModalData } from '../reducers/generalReducer';
import { getPostsAsync, restartState } from '../pages/posts/postsReducer';

export default function ConfirmModal() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const stateModal = useSelector(confirmModalData);
  const { show, title, message, actionOk } = stateModal;
  const [colorValidateEmail, setColorValidateEmail] = React.useState('#000000');
  const [email, setEmail] = useState('');

  if (!show) {
    return <></>;
  }

  const closeModal = () => {
    dispatch(setConfirmModalData({ show: !show, title: '', message: '', actionOk: null }));
  };

  const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  };

  const changeEmail = (text) => {
    if (validateEmail(text)) {
      setColorValidateEmail('#000000');
    } else {
      setColorValidateEmail('#ff0004');
    }
    setEmail(text);
  };

  const onSubmit = (data) => {
    if (validateEmail(email)) {
      localStorage.setItem('u_session', email);
      setTimeout(() => {
        //Reseteamos el estado actual de post para prepararnos a solicitar nuevamente los post
        dispatch(restartState());
        dispatch(getPostsAsync(0));
      }, 500);
      closeModal();
    } else {
      alert('Correo invalido');
    }
  };

  return (
    <div id='id01' className='modal'>
      <span className='close' title='Close Modal' onClick={() => closeModal()}>
        ×
      </span>
      <form className='modal-content' onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <h1>{title}</h1>
          <p>{message}</p>
          <input
            type='email'
            placeholder='Correo'
            {...register('email', { required: true })}
            style={{ color: colorValidateEmail }}
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
          />
          <div className='clearfix'>
            <button type='button' className='btn red' onClick={() => closeModal()}>
              <span>Cancel</span>
            </button>
            <button type='submit' className='btn blue'>
              <span>Ok</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
