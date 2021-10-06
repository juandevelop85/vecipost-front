import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './Posts.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getPostsAsync, incrementPage, changeY, selectData, actualPage, actualY, selectPost } from './postsReducer';
import Logo from '../../assets/images/img_avatar.png';
import useObserver from '../../hooks/useObserver';
import PostList from './postList';
import { PublicPosts } from '../public_post/PublicPosts';
import { setCookie } from '../../api/session';

let localPrevY = 0;
let localPage = 0;

moment.locale('es');

export function Posts() {
  const history = useHistory();
  const loadingRef = useRef(null);
  const postsData = useSelector(selectData);
  const page = useSelector(actualPage);
  const prevY = useSelector(actualY);
  const [createNewPost, setCreateNewPost] = useState(false);

  localPrevY = prevY;
  localPage = page;

  const dispatch = useDispatch();

  setCookie('u_session', 'juandevelop85@gmail.com');

  useEffect(() => {
    dispatch(getPostsAsync(page));
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new window.IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
  }, []);

  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (localPrevY > y) {
      addPosts();
    }
    dispatch(changeY(y));
  };

  const addPosts = () => {
    dispatch(incrementPage());
    dispatch(getPostsAsync(localPage));
  };

  const loadingCSS = {
    height: '100px',
    margin: '30px',
  };

  const goToPostDetail = (id) => {
    // dispatch(selectPost(id))
    history.push(`/status/${id}`);
  };

  return (
    <div className='container'>
      <div className='posts-container'>
        <div className='return-section'>
          <i className='fa fa-pencil action-pages' onClick={() => setCreateNewPost((actual) => !actual)}></i>
        </div>
        <div className='col-6 column wrap'>{createNewPost && <PublicPosts />}</div>
        <PostList data={postsData} action={(id) => goToPostDetail(id)} />

        <div ref={loadingRef} style={loadingCSS}></div>
      </div>
      <div className='col-2 column wrap'></div>
    </div>
  );
}
