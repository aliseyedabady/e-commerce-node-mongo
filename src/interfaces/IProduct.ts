export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  categoryId: string;
  ownerId: string;
  off?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
