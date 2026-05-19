import { Box, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { SortOption } from "../hooks/useCarFilters";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterYear: string;
  onFilterYearChange: (year: string) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  availableYears: number[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  filterYear,
  onFilterYearChange,
  sortBy,
  onSortByChange,
  availableYears,
}: FilterBarProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 4, alignItems: "center" }}>
      <TextField
        label="Search Make or Model"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flexGrow: 1, width: { xs: "100%", md: "auto" } }}
      />
      <FormControl sx={{ minWidth: 120, width: { xs: "100%", md: "auto" } }}>
        <InputLabel id="filter-year-label">Year</InputLabel>
        <Select
          labelId="filter-year-label"
          value={filterYear}
          label="Year"
          onChange={(e: SelectChangeEvent) => onFilterYearChange(e.target.value)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {availableYears.map((year) => (
            <MenuItem key={year} value={year.toString()}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150, width: { xs: "100%", md: "auto" } }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortBy}
          label="Sort By"
          onChange={(e: SelectChangeEvent) => onSortByChange(e.target.value as SortOption)}
        >
          <MenuItem value="make-asc">Make (A-Z)</MenuItem>
          <MenuItem value="make-desc">Make (Z-A)</MenuItem>
          <MenuItem value="year-desc">Year (Newest)</MenuItem>
          <MenuItem value="year-asc">Year (Oldest)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
