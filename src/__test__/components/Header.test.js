import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Header from '../../components/header';
import ProviderMock from '../../__mocks__/providerMock';

describe('<Header />', () => {
  test('Render del componente Header', () => {
    const header = shallow(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    expect(header.length).toEqual(1);
  });
  
  test('Render del Header', () => {
    const header = mount(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    expect(header.find('.dropbtn').text()).toEqual('Opciones');
  });
});

describe('Header snapshot', () => {
  test('Comprobar la UI del componente Footer', () => {
    const header = create(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    expect(header.toJSON()).toMatchSnapshot();
  });
});
