export interface ProductModel {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface quantity {
  id: number;
  count: number;
  price: number;
  inCart: boolean;
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
