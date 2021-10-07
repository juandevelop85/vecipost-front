import React from 'react';
import postMock from '../../__mocks__/postsMock';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/providerMock';
import PostList from '../../pages/posts/postList';

describe('post component', () => {
  test('Render del componente', () => {
    const product = shallow(
      <ProviderMock>
        <PostList />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  describe('Comprobar ejecucion de la accion sobre el titulo.', () => {
    test('Comprobar la UI del componente PostList', () => {
      const handleAddToCart = jest.fn();
      const wrapper = mount(
        <ProviderMock>
          <PostList data={postMock} action={handleAddToCart} />
        </ProviderMock>
      );
      wrapper.find('#post-0').simulate('click');
      expect(handleAddToCart).toHaveBeenCalledTimes(1);
    });
  });
});
