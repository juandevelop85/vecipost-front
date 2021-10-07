import React from 'react';
import moment from 'moment';
import './Posts.css';

function PostList({ data, action }) {
  return (
    <>
      {data?.map((item, index) => {
        let nameImage = typeof item?.user_email === 'string' ? item?.user_email.slice(0, 2) : 'VP';
        return (
          <div className='post' key={`post-${index}`} onClick={() => action(item.id)}>
            <div className='post-body'>
              <div className='top-action-card'>
                <div className='action-card'>
                  <div style={{ width: '15%' }}>
                    <div className='image-name'>{nameImage}</div>
                  </div>
                  <div style={{ width: '85%' }}>
                    <strong className='title-text'>{item?.user_email}</strong>
                    <br></br>
                    <strong className='date-post-text'>{moment(item?.created_at).format('LLL')}</strong>
                  </div>
                </div>
                <div></div>
              </div>
              <br></br>
              <strong className='title-text'>{item?.name}</strong>
              <br></br>
              <label className='comment-text'>{item?.content}</label>
            </div>
            <div className='divisor'></div>
            <div className='post-action'>
              {item?.u_like_count === 1 && (
                <div>
                  <i className='fa fa-thumbs-o-up post-action-event'></i> <label className='post-action-text'>{item?.like_count}</label>
                </div>
              )}
              {item?.u_like_count !== 1 && (
                <div>
                  <i className='fa fa-thumbs-up post-action-event'></i> <label className='post-action-text'>{item?.like_count}</label>
                </div>
              )}
              {item?.u_dislike_count === 1 && (
                <div>
                  <i className='fa fa-thumbs-o-down post-action-event'></i> <label className='post-action-text'>{item?.dislike_count}</label>
                </div>
              )}
              {item?.u_dislike_count !== 1 && (
                <div>
                  <i className='fa fa-thumbs-down post-action-event'></i> <label className='post-action-text'>{item?.dislike_count}</label>
                </div>
              )}

              <div>
                <i className='fa fa-comments post-action-event'></i> <label className='post-action-text'>{item?.posts_comments?.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostList;
