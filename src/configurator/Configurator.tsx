import React, { FunctionComponent } from 'react';
import { ShoppingCart } from '../shopping-cart/ShoppingCart';
import './Configurator.css';

export const Configurator: FunctionComponent = ({ children }) => {
  return (
    <section className="configurator">
      <h1>Spaceship configurator</h1>
      <div>{ children }</div>
      <ShoppingCart></ShoppingCart>
    </section>
  );
}