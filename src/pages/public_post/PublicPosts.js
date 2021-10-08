import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './PublicPosts.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { setPostsAsync, newPost, status } from './publicPostsReducer';
import { addUserPost } from '../posts/postsReducer';

let localPrevY = 0;
let localPage = 0;

moment.locale('es');

export function PublicPosts() {
  const history = useHistory();
  const createPost = useSelector(newPost);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [colorValidateEmail, setColorValidateEmail] = React.useState('#000000');
  const createCommentStatus = useSelector(status);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (createCommentStatus === 'end') {
      history.push('/')
    }
  }, [createCommentStatus]);

  useEffect(() => {
    if (createPost.length > 0) {
      dispatch(addUserPost(createPost));
    }
  }, [createPost]);
  
  const goToMenu = () => {
    history.push(`/`);
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

  const createNewPost = () => {
    if (validateEmail(email)) {
      dispatch(setPostsAsync({ name, content, email }));
    } else {
      alert('Correo invalido');
    }
  };

  return (
    <div className='container'>
      <div className='row center full'>
        <div style={{ width: '50%' }}>
          <div className='row center full'>
            <div className='col-12 column'>
              <input type='text' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className='row center full'>
            <div className='col-12 column'>
              <textarea placeholder='Contenido' required value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
          </div>
          <div className='row center full'>
            <div className='col-12 column'>
              <input
                type='email'
                placeholder='Correo'
                style={{ color: colorValidateEmail }}
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='row center full'>
            <div className='col-12 column'>
              <button className='btn medium yellow' type='button' onClick={() => createNewPost()}>
                <span>Publicar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
