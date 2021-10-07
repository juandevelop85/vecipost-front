import React, { useEffect } from 'react';
import moment from 'moment';
import './PostsStatus.css';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetailAsync, comments, updateDataPost } from './postsStatusReducer';
import { selectData } from '../posts/postsReducer';
import PostList from '../posts/postList';

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
                      <div className='info-comment'>
                        <strong className='title-text'>{comment?.user_email}</strong>
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
      </div>
    </div>
  );
}
