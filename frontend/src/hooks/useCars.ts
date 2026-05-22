import { useQuery, useMutation } from "@apollo/client";
import { GET_CARS, ADD_CAR } from "../graphql/queries";
import { Car } from "../types";

export function useCars() {
  const { data, loading, error } = useQuery<{ cars: Car[] }>(GET_CARS);

  const [addCarMutation] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      const existingCars = cache.readQuery<{ cars: Car[] }>({ query: GET_CARS });
      if (existingCars && existingCars.cars) {
        cache.writeQuery({
          query: GET_CARS,
          data: { cars: [...existingCars.cars, addCar] },
        });
      }
    },
    onError(error) {
      console.error("Add car failed:", error.message);
    },
  });

  const addCar = async (carData: Omit<Car, "id" | "mobile" | "tablet" | "desktop">) => {
    await addCarMutation({ variables: carData });
  };

  return {
    cars: data?.cars || [],
    loading,
    error,
    addCar,
  };
}
