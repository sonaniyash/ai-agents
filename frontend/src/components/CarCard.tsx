import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Car } from "../types";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
      <Box sx={{ width: "100%", position: "relative", paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={car.desktop} />
          <source media="(min-width: 641px)" srcSet={car.tablet} />
          <img
            src={car.mobile}
            alt={`${car.year} ${car.make} ${car.model}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>
      </Box>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          {car.make} {car.model}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Chip label={car.year} color="primary" variant="outlined" />
          <Chip
            label={car.color}
            sx={{
              backgroundColor: car.color.toLowerCase(),
              color: ["white", "yellow", "silver", "lightgray", "beige"].includes(car.color.toLowerCase()) ? "black" : "white",
              border: "1px solid #ccc",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
