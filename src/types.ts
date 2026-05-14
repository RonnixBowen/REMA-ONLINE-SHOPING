export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Tech' | 'Lifestyle' | 'Home' | 'Fashion';
