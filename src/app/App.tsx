import React, { useEffect, useState } from 'react';
import { SimpleModuleProps, Slot } from '../slot/Slot';
import './App.css';

export const App = () => {
  const [cart, setCart] = useState<SimpleModuleProps[]>([{category: "Base price", name: "", cost: 1000}]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // TODO: This should be an enum
  const customOrdering = [
    "Base price",
    "Color",
    "Power",
    "Warp drive",
    "Option package"
  ];

  const addToCart = (module: SimpleModuleProps) => {
    // We can't use a Set, so an array that acts as one must do.
    setCart([...cart.filter(m => m.category !== module.category), module]);
  };

  const calculateTotalCost = (cart: SimpleModuleProps[]) => {
    return cart.reduce((totalCost, module: SimpleModuleProps) => totalCost + module.cost, 0);
  };

  const displayCart = (cart: SimpleModuleProps[]) => {
    const sortedCart = cart.sort((a, b) => customOrdering.findIndex(el => el === a.category) < customOrdering.findIndex(el => el === b.category) ? -1 : 1);
    // We will need to special-case the `Base price` to not have a leading plus sign.
    return sortedCart.map((m, index) => <React.Fragment key={index}>
      <span className="item">{ m.category }:</span>
      <span className="cost">{ m.category === "Base price" ? (`${m.cost}€`) : displayCost(m.cost) }</span>
    </React.Fragment>)
  };

  useEffect(() => setTotalCost(calculateTotalCost(cart)), [cart])

  return (
    <main className="app">
      <section className="configurator">
        <h1>Spaceship configurator</h1>
        <div className="categories">
          <Slot category="Select color" modules={[
            { category: "Color", color: "white", name: "Snow", cost: 0 },
            { category: "Color", color: "#ff7a00", name: "Volcano", cost: 100 },
            { category: "Color", color: "#6be4ff", name: "Sky", cost: 100 }
          ]} categorySelect={ addToCart }/>
          <Slot category="Select power" modules={[
            { category: "Power", name: "100 MW", cost: 0 },
            { category: "Power", name: "150 MW", cost: 200 },
            { category: "Power", name: "200 MW", cost: 500 }
          ]} categorySelect={ addToCart }/>
          <Slot category="Warp drive" modules={[
            { category: "Warp drive", name: "NO", cost: 0 },
            { category: "Warp drive", name: "YES", cost: 1000 }
          ]} categorySelect={ addToCart }/>
          <Slot category="Select option package" modules={[
            { category: "Option package", name: "Basic", cost: 0 },
            { category: "Option package", name: "Sport", cost: 100 },
            { category: "Option package", name: "Lux", cost: 500 }
          ]} categorySelect={ addToCart }/>
        </div>
        <div className="shopping-cart-container">
          <div className="shopping-cart">
            <div className="shopping-cart-list">
                { displayCart(cart) }
            </div>
            <hr />
            <div className="shopping-cart-list">
              <span className="item">Total:</span>
              <span className="cost total-cost">{ totalCost }€</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Converts a number to an explicitly signed string with a trailing `€`,
 * so it'll always have a `+` or a `-`.
 */
export function displayCost(cost: number): string {
  return cost >= 0 ? `+${cost}€` : `${cost}€`
};