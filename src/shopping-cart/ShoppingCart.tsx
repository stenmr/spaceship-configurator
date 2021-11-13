import React, { FunctionComponent, useEffect, useState } from "react";
import "./ShoppingCart.css";
import { Category, SimpleModuleProps } from "../slot/Slot";

type ShoppingCartProps = {
  cart: SimpleModuleProps[]
}

/**
 * Converts a number to an explicitly signed string with a trailing `€`,
 * so it'll always have a `+` or a `-`.
 */
export const displayCost = (cost: number) => {
  return cost >= 0 ? `+${cost}€` : `${cost}€`
};

export const ShoppingCart: FunctionComponent<ShoppingCartProps> = ({ cart }) => {
  const [totalCost, setTotalCost] = useState<number>(0);

  // Shopping cart item ordering
  const categoryOrdering = [
    Category.BasePrice,
    Category.Color,
    Category.Power,
    Category.WarpDrive,
    Category.OptionPackage
  ];

  const calculateTotalCost = (cart: SimpleModuleProps[]) => {
    return cart.reduce((totalCost, module: SimpleModuleProps) => totalCost + module.cost, 0);
  };

  const displayCart = (cart: SimpleModuleProps[]) => {
    const sortedCart = cart.sort((a, b) => categoryOrdering.findIndex(el => el === a.category) < categoryOrdering.findIndex(el => el === b.category) ? -1 : 1);
    // We will need to special-case the `Base price` to not have a leading plus sign.
    return sortedCart.map((m, index) => <React.Fragment key={index}>
      <span className="item">{ m.category }:</span>
      <span className="cost">{ m.category === "Base price" ? (`${m.cost}€`) : displayCost(m.cost) }</span>
    </React.Fragment>)
  };

  useEffect(() => setTotalCost(calculateTotalCost(cart)), [cart]);

  return (
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
  );
};