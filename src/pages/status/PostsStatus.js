import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './PostsStatus.css';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetailAsync, comments, updateDataPost } from './postsStatusReducer';
import { selectData } from '../posts/postsReducer';
import PostList from '../posts/postList';
import { PublicComment } from '../public_comments/PublicComment';

let localPrevY = 0;
let localPage = 0;

moment.locale('es');

export function PostsStatus() {
  const history = useHistory();
  const commentsData = useSelector(comments);
  const posts = useSelector(selectData);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    //Si posts cambia, modificamos el actual del state
    const post = posts.filter((post) => post.id == id);
    dispatch(updateDataPost(post));
  }, [posts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getPostDetailAsync(id));
  }, []);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 1.0,
  //   };
  //   const observer = new window.IntersectionObserver(handleObserver, options);
  //   observer.observe(loadingRef.current);
  // }, []);

  // const handleObserver = (entities, observer) => {
  //   const y = entities[0].boundingClientRect.y;

  //   if (localPrevY > y) {
  //     addPosts();
  //   }
  //   dispatch(changeY(y));
  // };

  // const addPosts = () => {
  //   dispatch(incrementPage());
  //   dispatch(getPostsAsync(localPage));
  // };

  // const loadingCSS = {
  //   height: '100px',
  //   margin: '30px',
  // };
  return (
    <div className='container'>
      <div className='comments-container'>
        <div className='return-section'>
          <i className='fa fa-chevron-left action-pages' onClick={() => history.goBack()}></i> Post
        </div>
        <div className='comments-section'>
          {commentsData?.map((post, index) => {
            return <PostList data={[post]} key={index} action={() => null} commentInNewPage={false} />;
          })}

          {commentsData[0]?.posts_comments?.map((comment, index) => {
            let nameImage = typeof comment?.user_email === 'string' ? comment?.user_email.slice(0, 2) : 'VP';
            return (
              <div className='comment' key={index}>
                <div className='comment-body'>
                  <div className='top-action-card'>
                    <div className='action-card'>
                      <div style={{ width: '15%' }}>
                        <div className='image-name'>{nameImage}</div>
                      </div>
                      <div style={{ width: '85%' }}>
                        <strong className='title-text'>{comment?.user_email}</strong>
                        <br></br>
                        <strong className='date-comment-text'>{moment(comment?.created_at).format('LLL')}</strong>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <br></br>
                  <strong className='title-text'>{comment?.name}</strong>
                  <br></br>
                  <label className='comment-text'>{comment?.content}</label>
                </div>
                <div className='comment-action'>
                  <div className='divisor'></div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div ref={loadingRef} style={loadingCSS}></div> */}
      </div>
    </div>
  );
}
