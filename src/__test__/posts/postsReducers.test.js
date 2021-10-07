import postReducer, { addUserPost, addPosts, incrementPage, getPostsAsync } from '../../pages/posts/postsReducer';
import postMock from '../../__mocks__/postsMock';

describe('counter reducer', () => {
  const initialState = {
    value: 0,
    status: 'idle',
    data: [],
    limit: 10,
    page: 0,
    prevY: 0,
  };
  
  it('should handle addUserPost', () => {
    const actual = postReducer(initialState, addUserPost(postMock));
    expect(actual.data.length).toEqual(1);
  });

  it('should handle increment', () => {
    const initial = postReducer(initialState, addUserPost(postMock));
    const actual = postReducer(initial, addPosts({ posts: postMock }));
    expect(actual.data.length).toEqual(2);
  });

  it('should handle decrement', () => {
    const actual = postReducer(initialState, incrementPage());
    expect(actual.page).toEqual(1);
  });

});
