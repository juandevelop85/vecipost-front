import React from 'react';
import postReducer, { addUserPost, addPosts, incrementPage, getPostsAsync } from '../../pages/posts/postsReducer';
import postMock from '../../__mocks__/postsMock';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/providerMock';
import { Posts } from '../../pages/posts/Posts';

describe('post component', () => {
  test('Render del componente', () => {
    const product = shallow(
      <ProviderMock>
        <Posts />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  describe('Post snapshot', () => {
    test('Comprobar la UI del componente Footer', () => {
      const post = create(
        <ProviderMock>
          <Posts />
        </ProviderMock>
      );
      expect(post.toJSON()).toMatchSnapshot();
    });
  });
});
