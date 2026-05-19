import { HttpResponse, graphql } from 'msw';
import { seedCars } from './data';
import {
  GetCarsResponse,
  GetCarsVariables,
  GetCarQueryResponse,
  GetCarQueryVariables,
} from '../graphql/queries';

export const handlers = [
  graphql.query<GetCarsResponse, GetCarsVariables>('GetCars', ({ variables }) => {
    const { searchTerm, year } = variables;

    let filteredCars = seedCars;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredCars = filteredCars.filter(
        (car) =>
          car.make.toLowerCase().includes(lowerCaseSearchTerm) ||
          car.model.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (year !== undefined && year !== null) {
      filteredCars = filteredCars.filter((car) => car.year === year);
    }

    return HttpResponse.json({
      data: {
        cars: filteredCars,
      }
    });
  }),

  graphql.query<GetCarQueryResponse, GetCarQueryVariables>('GetCar', ({ variables }) => {
    const { id } = variables;
    const car = seedCars.find((c) => c.id === id);

    if (car) {
      return HttpResponse.json({
        data: {
          car,
        }
      });
    }

    return HttpResponse.json({
      data: {
        car: null,
      }
    });
  }),
];