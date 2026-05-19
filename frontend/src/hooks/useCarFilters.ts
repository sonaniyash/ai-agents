import { useState, useMemo } from "react";
import { Car } from "../types";

export type SortOption = "year-asc" | "year-desc" | "make-asc" | "make-desc";

export function useCarFilters(cars: Car[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("make-asc");

  const filteredAndSortedCars = useMemo(() => {
    let result = [...cars];

    // Filter by model search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((car) =>
        car.model.toLowerCase().includes(lowerQuery) ||
        car.make.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by year
    if (filterYear) {
      result = result.filter((car) => car.year.toString() === filterYear);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "year-asc":
          return a.year - b.year;
        case "year-desc":
          return b.year - a.year;
        case "make-asc":
          return a.make.localeCompare(b.make);
        case "make-desc":
          return b.make.localeCompare(a.make);
        default:
          return 0;
      }
    });

    return result;
  }, [cars, searchQuery, filterYear, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    filterYear,
    setFilterYear,
    sortBy,
    setSortBy,
    filteredCars: filteredAndSortedCars,
  };
}
