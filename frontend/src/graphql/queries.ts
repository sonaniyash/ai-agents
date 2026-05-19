import { gql } from '@apollo/client';
import { Car } from '../types';

export interface GetCarsResponse {
  cars: Car[];
}

export interface GetCarsVariables {
  searchTerm?: string;
  year?: number;
}

export const GET_CARS = gql`
  query GetCars($searchTerm: String, $year: Int) {
    cars(searchTerm: $searchTerm, year: $year) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export interface AddCarVariables {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface AddCarResponse {
  addCar: Car;
}

export const ADD_CAR = gql`
  mutation AddCar(
    $make: String!
    $model: String!
    $year: Int!
    $color: String!
    $mobile: String!
    $tablet: String!
    $desktop: String!
  ) {
    addCar(
      make: $make
      model: $model
      year: $year
      color: $color
      mobile: $mobile
      tablet: $tablet
      desktop: $desktop
    ) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export interface GetCarQueryResponse {
  car: Car | null;
}

export interface GetCarQueryVariables {
  id: string;
}

export const GET_CAR_QUERY = gql`
  query GetCar($id: ID!) {
    car(id: $id) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;