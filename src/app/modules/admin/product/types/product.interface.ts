export interface CategoryProduct {
  id: number;
  name: string;
  description: string | null;
  creationDate: Date;
  editionDate: Date;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  categoryProduct: CategoryProduct;
  quantityPerUnit: number;
  unitPrice: number;
  unitsInStock: number;
  discontinued: boolean;
  productImageName: string;
  productImagePath: string;
  isActive: boolean;
  creationDate: Date;
  editionDate: Date;
}
