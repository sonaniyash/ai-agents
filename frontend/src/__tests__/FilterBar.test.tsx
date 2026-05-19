import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterBar } from "../components/FilterBar";

describe("FilterBar", () => {
  it("renders all filter inputs", () => {
    render(
      <FilterBar
        searchQuery=""
        onSearchChange={vi.fn()}
        filterYear=""
        onFilterYearChange={vi.fn()}
        sortBy="make-asc"
        onSortByChange={vi.fn()}
        availableYears={[2020, 2021]}
      />
    );

    expect(screen.getByLabelText(/Search Make or Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort By/i)).toBeInTheDocument();
  });

  it("calls onSearchChange when typing in search input", () => {
    const onSearchChange = vi.fn();
    render(
      <FilterBar
        searchQuery=""
        onSearchChange={onSearchChange}
        filterYear=""
        onFilterYearChange={vi.fn()}
        sortBy="make-asc"
        onSortByChange={vi.fn()}
        availableYears={[2020]}
      />
    );

    const searchInput = screen.getByLabelText(/Search Make or Model/i);
    fireEvent.change(searchInput, { target: { value: "Honda" } });

    expect(onSearchChange).toHaveBeenCalledWith("Honda");
    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });
});
