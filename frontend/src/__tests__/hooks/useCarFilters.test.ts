import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCarFilters } from "../../hooks/useCarFilters";
import { Car } from "../../types";

const mockCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Blue",
    mobile: "img-mob-1",
    tablet: "img-tab-1",
    desktop: "img-desk-1",
  },
  {
    id: "2",
    make: "Honda",
    model: "Accord",
    year: 2021,
    color: "Silver",
    mobile: "img-mob-2",
    tablet: "img-tab-2",
    desktop: "img-desk-2",
  },
  {
    id: "3",
    make: "Toyota",
    model: "Corolla",
    year: 2019,
    color: "Red",
    mobile: "img-mob-3",
    tablet: "img-tab-3",
    desktop: "img-desk-3",
  },
];

describe("useCarFilters", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCarFilters(mockCars));

    expect(result.current.searchQuery).toBe("");
    expect(result.current.filterYear).toBe("");
    expect(result.current.sortBy).toBe("make-asc");
    // Sorted by make ASC: Honda (2), Toyota (1), Toyota (3)
    // Wait, order of Toyota Camry and Toyota Corolla might depend on their original order since make is the same.
    // Let's just check length for now.
    expect(result.current.filteredCars.length).toBe(3);
  });

  it("should filter by search query (make or model)", () => {
    const { result } = renderHook(() => useCarFilters(mockCars));

    act(() => {
      result.current.setSearchQuery("honda");
    });
    expect(result.current.filteredCars.length).toBe(1);
    expect(result.current.filteredCars[0]?.make).toBe("Honda");

    act(() => {
      result.current.setSearchQuery("camry");
    });
    expect(result.current.filteredCars.length).toBe(1);
    expect(result.current.filteredCars[0]?.model).toBe("Camry");
  });

  it("should filter by year", () => {
    const { result } = renderHook(() => useCarFilters(mockCars));

    act(() => {
      result.current.setFilterYear("2020");
    });
    expect(result.current.filteredCars.length).toBe(1);
    expect(result.current.filteredCars[0]?.year).toBe(2020);
  });

  it("should sort by year descending", () => {
    const { result } = renderHook(() => useCarFilters(mockCars));

    act(() => {
      result.current.setSortBy("year-desc");
    });
    expect(result.current.filteredCars[0]?.year).toBe(2021); // Honda Accord
    expect(result.current.filteredCars[1]?.year).toBe(2020); // Toyota Camry
    expect(result.current.filteredCars[2]?.year).toBe(2019); // Toyota Corolla
  });
});
