import React, { useState, useEffect, useRef } from 'react';
import './Posts.css';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from './postsReducer';

export function Posts() {
  const loadingRef = useRef(null);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver.bind(this), options);
    // observer.observe(loadingRef.current);
  }, []);

  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;
    console.log(y);
  };

  const onIncrementPosts = () => {
    setIncrementAmount((oldArray) => [...oldArray, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]]);
  };

  const loadingCSS = {
    height: '100px',
    margin: '30px',
  };

  return (
    <div className='container'>
      <div className='posts-container'>
        {incrementAmount.map((item, index) => {
          return (
            <div className='post' key={index}>
              <div className='post-info'>
                <div className='top-action-card'>
                  <div></div>
                  <div className='action-card'>
                    <label className='salary-text'>Salario: </label>
                  </div>
                </div>
                <br></br>
                <label>
                  <strong>Empresa:</strong>
                </label>
              </div>
              <div className='post-action'>
                <div>
                  <i className='fa fa-thumbs-o-up post-action-event'></i> <label className='post-action.text'>5</label>
                </div>
                <div>
                  <i className='fa fa-thumbs-o-down post-action-event'></i> <label className='post-action.text'>3</label>
                </div>
                <div>
                  <i className='fa fa-comments post-action-event'></i> <label className='post-action.text'>234</label>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={(loadingRef) => (loadingRef = loadingRef)} style={loadingCSS}></div>
      </div>
    </div>
  );
}
