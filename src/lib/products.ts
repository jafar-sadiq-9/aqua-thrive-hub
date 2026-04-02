import guppyImg from "@/assets/fish-guppy.jpg";
import bettaImg from "@/assets/fish-betta.jpg";
import neonTetraImg from "@/assets/fish-neon-tetra.jpg";
import angelfishImg from "@/assets/fish-angelfish.jpg";
import mollyImg from "@/assets/fish-molly.jpg";
import oscarImg from "@/assets/fish-oscar.jpg";
import discusImg from "@/assets/fish-discus.jpg";
import clownfishImg from "@/assets/fish-clownfish.jpg";
import aquariumTankImg from "@/assets/aquarium-tank.jpg";
import filterImg from "@/assets/accessory-filter.jpg";
import lightImg from "@/assets/accessory-light.jpg";

export type ProductCategory = "fishes" | "aquariums-accessories";

export interface Product {
  id: string;
  name: string;
  price: number;
  pairPrice?: number;
  image: string;
  description: string;
  category: ProductCategory;
  stock: number;
  isPair?: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  // Beginner Fish
  {
    id: "guppy-1",
    name: "Fancy Guppy",
    price: 3.99,
    pairPrice: 6.49,
    image: guppyImg,
    description: "Colorful and easy to care for. Perfect for beginners and community tanks.",
    category: "beginner",
    stock: 50,
    featured: true,
  },
  {
    id: "neon-tetra-1",
    name: "Neon Tetra",
    price: 2.49,
    pairPrice: 3.99,
    image: neonTetraImg,
    description: "Stunning iridescent blue and red stripe. Best kept in schools of 6+.",
    category: "beginner",
    stock: 100,
    featured: true,
  },
  {
    id: "molly-1",
    name: "Golden Molly",
    price: 4.49,
    pairPrice: 7.49,
    image: mollyImg,
    description: "Hardy and peaceful. Great for planted community aquariums.",
    category: "beginner",
    stock: 35,
  },
  // Exotic Fish
  {
    id: "betta-1",
    name: "Halfmoon Betta",
    price: 12.99,
    image: bettaImg,
    description: "Magnificent flowing fins with vibrant colors. A true centerpiece fish.",
    category: "exotic",
    stock: 15,
    featured: true,
  },
  {
    id: "angelfish-1",
    name: "Silver Angelfish",
    price: 14.99,
    pairPrice: 24.99,
    image: angelfishImg,
    description: "Elegant and graceful. The queen of freshwater aquariums.",
    category: "exotic",
    stock: 20,
    featured: true,
  },
  {
    id: "oscar-1",
    name: "Tiger Oscar",
    price: 19.99,
    image: oscarImg,
    description: "Intelligent and personable. Grows large and recognizes its owner.",
    category: "exotic",
    stock: 8,
  },
  {
    id: "discus-1",
    name: "Blue Diamond Discus",
    price: 49.99,
    pairPrice: 84.99,
    image: discusImg,
    description: "The king of freshwater fish. Stunning colors and disc-shaped body.",
    category: "exotic",
    stock: 5,
    featured: true,
  },
  {
    id: "clownfish-1",
    name: "Clownfish",
    price: 24.99,
    pairPrice: 42.99,
    image: clownfishImg,
    description: "The iconic Nemo fish. Hardy and great for saltwater beginners.",
    category: "exotic",
    stock: 12,
  },
  // Pair combos
  {
    id: "guppy-pair",
    name: "Guppy Pair",
    price: 6.49,
    image: guppyImg,
    description: "Male & Female Fancy Guppy pair. Perfect for breeding.",
    category: "pairs",
    stock: 25,
    isPair: true,
    featured: true,
  },
  {
    id: "betta-pair",
    name: "Betta Pair",
    price: 22.99,
    image: bettaImg,
    description: "Male & Female Betta pair. Beautiful breeding combo.",
    category: "pairs",
    stock: 8,
    isPair: true,
  },
  {
    id: "angelfish-pair",
    name: "Angelfish Pair",
    price: 24.99,
    image: angelfishImg,
    description: "Bonded Angelfish pair. Ready to breed.",
    category: "pairs",
    stock: 10,
    isPair: true,
  },
  {
    id: "discus-pair",
    name: "Discus Pair",
    price: 84.99,
    image: discusImg,
    description: "Premium Blue Diamond Discus breeding pair.",
    category: "pairs",
    stock: 3,
    isPair: true,
  },
  // Aquariums
  {
    id: "tank-20g",
    name: '20 Gallon Glass Tank',
    price: 89.99,
    image: aquariumTankImg,
    description: "Crystal clear glass aquarium with LED hood. Perfect starter tank.",
    category: "aquariums",
    stock: 15,
    featured: true,
  },
  {
    id: "tank-55g",
    name: '55 Gallon Premium Tank',
    price: 249.99,
    image: aquariumTankImg,
    description: "Professional grade aquarium with built-in filtration system.",
    category: "aquariums",
    stock: 7,
  },
  // Accessories
  {
    id: "filter-1",
    name: "Pro Canister Filter",
    price: 64.99,
    image: filterImg,
    description: "High-performance 4-stage filtration for tanks up to 75 gallons.",
    category: "accessories",
    stock: 22,
    featured: true,
  },
  {
    id: "light-1",
    name: "LED Aquarium Light Bar",
    price: 34.99,
    image: lightImg,
    description: "Full spectrum LED with sunrise/sunset mode. Promotes plant growth.",
    category: "accessories",
    stock: 30,
  },
];

export const categoryLabels: Record<ProductCategory, string> = {
  beginner: "Beginner Fish",
  exotic: "Exotic Fish",
  pairs: "Fish Pairs",
  aquariums: "Aquariums",
  accessories: "Accessories",
};
