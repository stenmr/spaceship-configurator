import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';
import { Category } from '../slot/Slot';

test('selecting a module adds it to cart', () => {
  render(<App />);

  expect(screen.queryByText(Category.OptionPackage + ":")).toBeNull();

  const optionPackageModule = screen.getByText("Sport").parentElement!;
  fireEvent.click(optionPackageModule);

  const optionPackageInCart = screen.getByText(Category.OptionPackage + ":");
  expect(optionPackageInCart).toBeInTheDocument();
});
