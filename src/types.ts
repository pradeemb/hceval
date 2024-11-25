import { LucideIcon } from 'lucide-react';

export interface Subcategory {
  name: string;
  weight: number;
  score: number;
}

export interface Category {
  name: string;
  weight: number;
  subcategories: Subcategory[];
  icon: LucideIcon;
}