import { useMemo } from "react";
import { Box, Typography, CircularProgress, Grid2 as Grid, Alert } from "@mui/material";
import { useCars } from "../hooks/useCars";
import { useCarFilters } from "../hooks/useCarFilters";
import { CarCard } from "./CarCard";
import { FilterBar } from "./FilterBar";
import { AddCarForm } from "./AddCarForm";

export function CarList() {
  const { cars, loading, error, addCar } = useCars();
  
  const {
    searchQuery,
    setSearchQuery,
    filterYear,
    setFilterYear,
    sortBy,
    setSortBy,
    filteredCars,
  } = useCarFilters(cars);

  const availableYears = useMemo(() => {
    const years = Array.from(new Set(cars.map((car) => car.year)));
    return years.sort((a, b) => b - a); // Descending order
  }, [cars]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">Error loading cars: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <AddCarForm onAddCar={addCar} />
      
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterYear={filterYear}
        onFilterYearChange={setFilterYear}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        availableYears={availableYears}
      />

      {filteredCars.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
          No cars found matching your criteria.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredCars.map((car) => (
            <Grid key={car.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
