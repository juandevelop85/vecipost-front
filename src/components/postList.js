import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import '../pages/posts/Posts.css';
import { getPostsAsync, likeEvent, status } from '../pages/posts/postsReducer';
import { PublicComment } from '../pages/public_comments/PublicComment';
import { setConfirmModalData, setIsLoading } from '../reducers/generalReducer';

function PostList({ data, action, commentInNewPage = true }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showCreateComment, setShowCreateComment] = useState(false);
  const postListStatus = useSelector(status);
  const userSession = localStorage.getItem('authorization');
  
  useEffect(() => {
    
    if (postListStatus === 'loading') {
      
      dispatch(setIsLoading(true));
    }
    else if (postListStatus === 'end') {
      dispatch(setIsLoading(false));
    }
  }, [postListStatus]);

  const sendLikeEvent = (isLike, item) => {
    if (userSession == undefined) {
      dispatch(setConfirmModalData({ show: true, title: 'Hola', message: 'Para interactuar debes ingresar tu email.', actionOk: null }));
    } else {
      dispatch(likeEvent({ post_id: item.id, isLike }));
    }
  };

  const reloadPosts = () => {
    dispatch(getPostsAsync(0))
  }

  const howCreateComment = (id) => {
    if (commentInNewPage) {
      history.push(`/create/comment/${id}`);
    } else {
      setShowCreateComment(!showCreateComment);
    }
  };

  return (
    <>
      {data?.map((item, index) => {
        let nameImage = typeof item?.user_email === 'string' ? item?.user_email.slice(0, 2) : 'VP';
        return (
          <div className='post' key={`post-${index}`}>
            <div className='post-body' >
              <div className='top-action-card'>
                <div className='action-card'>
                  <div style={{ width: '15%' }}>
                    <div className='image-name'>{nameImage}</div>
                  </div>
                  <div className='info-comment'>
                    <strong className='title-text'>{item?.user_email}</strong>
                    <strong className='date-post-text'>{moment(item?.created_at).format('LLL')}</strong>
                  </div>
                </div>
                <div></div>
              </div>
              <br></br>
              <strong id={`post-${index}`} className='title-text' onClick={() => action(item.id)}>{item?.name}</strong>
              <br></br>
              <label className='comment-text'>{item?.content}</label>
            </div>
            <div className='divisor'></div>
            <div className='post-action'>
              {item?.u_like_count === 1 && (
                <div onClick={() => sendLikeEvent(null, item)}>
                  <i className='fa fa-heart post-action-event red'></i> <label className='post-action-text'>{item?.like_count}</label>
                </div>
              )}
              {item?.u_like_count !== 1 && (
                <div onClick={() => sendLikeEvent(true, item)}>
                  <i className='fa fa-heart-o post-action-event'></i> <label className='post-action-text'>{item?.like_count}</label>
                </div>
              )}
              {item?.u_dislike_count === 1 && (
                <div onClick={() => sendLikeEvent(null, item)}>
                  <i className='fa fa-thumbs-down post-action-event red'></i> <label className='post-action-text'>{item?.dislike_count}</label>
                </div>
              )}
              {item?.u_dislike_count !== 1 && (
                <div onClick={() => sendLikeEvent(false, item)}>
                  <i className='fa fa-thumbs-o-down post-action-event'></i> <label className='post-action-text'>{item?.dislike_count}</label>
                </div>
              )}
              <div onClick={() => howCreateComment(item.id)} >
                <i className='fa fa-comments post-action-event'></i> <label className='post-action-text'>{item?.posts_comments?.length}</label>
              </div>
            </div>
          </div>
        );
      })}
      {showCreateComment && (
        <div className='add-comment'>
          <PublicComment />
        </div>
      )}
    </>
  );
}

export default PostList;
