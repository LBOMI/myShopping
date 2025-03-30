// src/types/product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string; // 선택적인 설명 (없어도 됨)
  }

export interface ProductInput {
  name: string;
  price: number;
  image: string;
  description?: string;
}