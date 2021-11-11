import React, { FunctionComponent } from 'react';
import './Configurator.css';

export const Configurator: FunctionComponent = ({ children }) => {
  return (
    <section className="configurator">
      <h1>Spaceship configurator</h1>
      <div>{ children }</div>
    </section>
  );
}