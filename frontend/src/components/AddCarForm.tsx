import { useState } from "react";
import { TextField, Button, Paper, Typography, Grid2 as Grid } from "@mui/material";
import { Car } from "../types";

interface AddCarFormProps {
  onAddCar: (car: Omit<Car, "id" | "mobile" | "tablet" | "desktop">) => Promise<void>;
}

export function AddCarForm({ onAddCar }: AddCarFormProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year || !color) return;

    setLoading(true);
    try {
      await onAddCar({
        make,
        model,
        year: Number(year),
        color,
      });
      // Reset form
      setMake("");
      setModel("");
      setYear("");
      setColor("");
    } catch (err) {
      console.error("Failed to add car", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Car
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            label="Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            label="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            type="number"
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
            required
            inputProps={{ min: 1886, max: new Date().getFullYear() + 1 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} sx={{ display: "flex", alignItems: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ height: "100%" }}
          >
            {loading ? "Adding..." : "Add Car"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
