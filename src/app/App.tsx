import React, { useState } from 'react';
import { ModuleProps, Slot } from '../slot/Slot';
import './App.css';

function App() {
  const [cart, setCart] = useState<ModuleProps[]>([]);

  // const addToCart = (index: number) => {
  //   setCart(cart.concat(modules[index]));
  // };

  const calculateCost = () => {
    return cart.reduce((cost, module: ModuleProps) => cost + module.cost, 0);
  };

  return (
    <main className="App">
      <section className="configurator">
        <h1>Spaceship configurator</h1>
        <div className="categories">
          <Slot title="Select color" modules={[
            {name: "Snow", cost: 0},
            {name: "Volcano", cost: 100},
            {name: "Sky", cost: 100}
          ]}/>
          <Slot title="Select power" modules={[
            {name: "100 MW", cost: 0},
            {name: "150 MW", cost: 200},
            {name: "200 MW", cost: 500}
          ]}/>
          <Slot title="Warp drive" modules={[
            {name: "NO", cost: 0},
            {name: "YES", cost: 1000}
          ]}/>
          {/* <Slot title="Select option package">
            </Slot> */}
        </div>
        <div className="shopping-cart"></div>
      </section>
    </main>
  );
}

export default App;
