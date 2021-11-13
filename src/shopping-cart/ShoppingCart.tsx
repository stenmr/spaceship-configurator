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

type Pair<T> = {
  left: T,
  right: T,
}

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

  const displayCart = (cart: SimpleModuleProps[]): Pair<JSX.Element[]> => {
    const sortedCart = cart.sort((a, b) =>
      categoryOrdering.findIndex(el => el === a.category)
      < categoryOrdering.findIndex(el => el === b.category)
      ? -1 : 1
    );
    const items: JSX.Element[] = [];
    const costs: JSX.Element[] = [];

    // We will need to special-case the `Base price` to not have a leading plus sign.
    sortedCart.forEach((m, index) => {
      items.push(<span className="item">{ m.category }:</span>);
      costs.push(<span className="cost">{ m.category === "Base price" ? (`${m.cost}€`) : displayCost(m.cost) }</span>);
    })

    return { left: items, right: costs};
  };

  useEffect(() => setTotalCost(calculateTotalCost(cart)), [cart]);

  const { left: items, right: costs } = displayCart(cart);

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <div className="items">{ items }</div>
        <div className="costs">{ costs }</div>
        <hr />
        <div className="total items">
          <span className="item">Total:</span>
        </div>
        <div className="total costs">
          <span className="cost">{ totalCost }€</span>
        </div>
      </div>
    </div>
  );
};