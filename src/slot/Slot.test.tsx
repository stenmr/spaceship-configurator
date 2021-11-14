import { fireEvent, render, screen } from '@testing-library/react';
import { Category, Slot } from './Slot';

test('selection of modules in a slot', () => {
  const handleSelect = jest.fn();

  render(<Slot title="Select color" modules={[
            { category: Category.Color, color: "white", name: "Snow", cost: 0 },
            { category: Category.Color, color: "#ff7a00", name: "Volcano", cost: 100 }
          ]} categorySelect={ handleSelect }/>);
  const snowColor = screen.getByText("Snow").parentElement!;
  expect(snowColor.tagName).toBe("LABEL");
  // Doesn't have selected style, as it is not selected yet
  expect(snowColor.classList.contains("selected")).toBeFalsy();
  fireEvent.click(snowColor);
  // Has called categorySelect
  expect(handleSelect).toHaveBeenCalledTimes(1);
  // Now has appropriate styling
  expect(snowColor.classList.contains("selected")).toBeTruthy();
});