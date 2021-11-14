import { render, screen } from '@testing-library/react';
import { ShoppingCart } from './ShoppingCart';
import { Category, SimpleModuleProps } from '../slot/Slot';

test('calculates total cost correctly', () => {
  const cart: SimpleModuleProps[] = [
    { category: Category.BasePrice, name: "", cost: 1000 },
    { category: Category.OptionPackage, name: "Lux", cost: 500 },
  ];

  const { container } = render(<ShoppingCart cart={ cart } />);
  const totalCost = container.querySelector(".total.costs > .cost");

  expect(totalCost?.textContent).toBe("1500€");
});

test('lists shopping cart contents', () => {
  const cart: SimpleModuleProps[] = [
    { category: Category.BasePrice, name: "", cost: 1000 },
    { category: Category.Color, color: "#ff7a00", name: "Volcano", cost: 100 },
    { category: Category.OptionPackage, name: "Lux", cost: 500 },
  ];

  render(<ShoppingCart cart={ cart } />);
  const basePrice = screen.getByText(Category.BasePrice + ":");
  const color = screen.getByText(Category.Color + ":");
  const optionPackage = screen.getByText(Category.OptionPackage + ":");

  expect(basePrice).toBeInTheDocument();
  expect(color).toBeInTheDocument();
  expect(optionPackage).toBeInTheDocument();
});