import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./Home";

test("should return 0 for an empty string", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText(/enter the values/i);
  fireEvent.change(input, { target: { value: "" } });

  const button = screen.getByText(/calculate/i);
  fireEvent.click(button);

  const result = screen.getByText(/result/i);
  expect(result).toHaveTextContent("0");
});

test("should return the correct sum for multiple numbers", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText(/enter the values/i);
  fireEvent.change(input, { target: { value: "1,2,3" } });

  const button = screen.getByText(/calculate/i);
  fireEvent.click(button);

  const result = screen.getByText(/result/i);
  expect(result).toHaveTextContent("6");
});

test("should handle newlines as delimiters", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText(/enter the values/i);
  fireEvent.change(input, { target: { value: "1\n2,3" } });

  const button = screen.getByText(/calculate/i);
  fireEvent.click(button);

  const result = screen.getByText(/result/i);
  expect(result).toHaveTextContent("6");
});

test("should throw an error for negative numbers", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText(/enter the values/i);
  fireEvent.change(input, { target: { value: "1,-2,3" } });

  const button = screen.getByText(/calculate/i);
  fireEvent.click(button);

  const result = screen.getByText(/result/i);
  expect(result).toHaveTextContent("Negative numbers are not allowed:");
});
