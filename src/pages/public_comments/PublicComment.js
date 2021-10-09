import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './PublicComment.css';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { newComment, restartStatus, setCommentAsync, status } from './publicCommentReducer';
import { getCookie, setCookie } from '../../api/session';
import { getPostDetailAsync } from '../status/postsStatusReducer';
import { updatePosts } from '../posts/postsReducer';

moment.locale('es');

export function PublicComment() {
  
  const session_user = localStorage.getItem('authorization');

  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const createCommentStatus = useSelector(status);
  const comment = useSelector(newComment)
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState(session_user || '');
  const [colorValidateEmail, setColorValidateEmail] = React.useState('#000000');

  const dispatch = useDispatch();

  useEffect(() => {
    if (createCommentStatus === 'end') {
      dispatch(restartStatus());
      dispatch(updatePosts(comment))
      goToPostDetail();
    }
  }, [createCommentStatus]);

  const goToPostDetail = () => {
    history.replace(`/status/${id}`);
    dispatch(getPostDetailAsync(id));
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
      const payload = {
        ...data,
        post_id: parseInt(id),
      };
      localStorage.setItem('authorization', data.email)
      dispatch(setCommentAsync(payload));
    } else {
      alert('Correo invalido');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row center full'>
          <div className='public-comment-container'>
            <div className='row center full'>
              <div className='col-12 column'>
                <input
                  type='text'
                  placeholder='Nombre'
                  {...register('name', { required: true })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className='row center full'>
              <div className='col-12 column'>
                <textarea
                  placeholder='Comentario'
                  {...register('content', { required: true })}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <div className='row center full'>
              <div className='col-12 column'>
                <input
                  type='email'
                  placeholder='Correo'
                  {...register('email', { required: true })}
                  style={{ color: colorValidateEmail }}
                  value={email}
                  onChange={(e) => changeEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='row center full'>
              <div className='col-12 column'>
                <button type='submit' className='btn full yellow'>
                  <span>Publicar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
