import React, { useEffect, useState } from 'react';
import { PseudoModuleProps, Slot } from '../slot/Slot';
import './App.css';

function App() {
  const [cart, setCart] = useState<PseudoModuleProps[]>([{category: "Base price", name: "", cost: 1000}]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const addToCart = (module: PseudoModuleProps) => {
    // We can't use a Set, so an array that acts as one must do.
    setCart([...cart.filter(m => m.category !== module.category), module]);
  };

  const calculateTotalCost = (cart: PseudoModuleProps[]) => {
    return cart.reduce((totalCost, module: PseudoModuleProps) => totalCost + module.cost, 0);
  };

  useEffect(() => setTotalCost(calculateTotalCost(cart)), [cart])

  return (
    <main className="App">
      <section className="configurator">
        <h1>Spaceship configurator</h1>
        <div className="categories">
          <Slot title="Select color" modules={[
            { category: "color", name: "Snow", cost: 0 },
            { category: "color", name: "Volcano", cost: 100 },
            { category: "color", name: "Sky", cost: 100 }
          ]} categorySelect={ addToCart }/>
          <Slot title="Select power" modules={[
            { category: "power", name: "100 MW", cost: 0 },
            { category: "power", name: "150 MW", cost: 200 },
            { category: "power", name: "200 MW", cost: 500 }
          ]} categorySelect={ addToCart }/>
          <Slot title="Warp drive" modules={[
            { category: "warp drive", name: "NO", cost: 0 },
            { category: "warp drive", name: "YES", cost: 1000 }
          ]} categorySelect={ addToCart }/>
          {/* <Slot title="Select option package">
            </Slot> */}
        </div>
        <div className="shopping-cart">
          <div className="shopping-cart-list"></div>
          <div className="shopping-cart-total">Total: { totalCost }</div>
          </div>
      </section>
    </main>
  );
}

export default App;
