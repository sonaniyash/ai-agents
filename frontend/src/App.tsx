import { Container, Typography } from "@mui/material";
import { CarList } from "./components/CarList";

export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h3" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        Car Inventory Manager
      </Typography>
      <CarList />
    </Container>
  );
}
