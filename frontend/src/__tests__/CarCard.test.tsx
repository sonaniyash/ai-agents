import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CarCard } from "../components/CarCard";
import { Car } from '../types/index'

const mockCar: Car = {
  id: "1",
  make: "Tesla",
  model: "Model S",
  year: 2022,
  color: "Red",
  mobile: "https://example.com/mobile.jpg",
  tablet: "https://example.com/tablet.jpg",
  desktop: "https://example.com/desktop.jpg",
};

describe("CarCard", () => {
  it("renders the car details correctly", () => {
    render(<CarCard car={mockCar} />);

    expect(screen.getByText("Tesla Model S")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("renders responsive image sources", () => {
    const { container } = render(<CarCard car={mockCar} />);

    const picture = container.querySelector("picture");
    expect(picture).toBeInTheDocument();

    const sources = container.querySelectorAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("media", "(min-width: 1024px)");
    expect(sources[0]).toHaveAttribute("srcSet", "https://example.com/desktop.jpg");
    expect(sources[1]).toHaveAttribute("media", "(min-width: 641px)");
    expect(sources[1]).toHaveAttribute("srcSet", "https://example.com/tablet.jpg");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/mobile.jpg");
    expect(img).toHaveAttribute("alt", "2022 Tesla Model S");
  });
});
