// src/Home.test.js
import React from 'react';
import { shallow } from 'enzyme';
import Home from '.././pages/Home';

describe('Home component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBe(true);
  });

  it('sets document title to "HOME" on mount', () => {
    const spy = jest.spyOn(document, 'title', 'set');
    shallow(<Home />);
    expect(spy).toHaveBeenCalledWith('HOME');
    spy.mockRestore();
  });

  // Agrega más pruebas según sea necesario para verificar el renderizado y comportamiento del componente.
});
