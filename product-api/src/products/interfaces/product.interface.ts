export interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
}

export interface CreateProduct {
  title: string;
  price: number;
  stock: number;
}

export interface UpdateProduct extends Partial<CreateProduct> {}
