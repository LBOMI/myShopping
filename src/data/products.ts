// src/data/products.ts
import { Product } from '@/types/product';

const products: Product[] = [
    {
        id: 1,
        name: '후디',
        price: 59000,
        image: '/hoodie.jpg',
        description: '가볍고 편안한 캐주얼 후디.',
      },
  {
    id: 2,
    name: '티셔츠',
    price: 19900,
    image: '/tshirt.jpg',
    description: '편안한 면 소재의 반팔 티셔츠입니다.',
  },
  {
    id: 3,
    name: '청바지',
    price: 39900,
    image: '/jeans.jpg',
    description: '슬림 핏 데님 청바지.',
  }
];

export default products;
