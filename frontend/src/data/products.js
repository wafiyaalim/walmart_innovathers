export const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1199.99,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.8,
    reviews: 2847,
    description: 'The most advanced iPhone ever with titanium design and powerful A17 Pro chip.',
    features: ['A17 Pro chip', 'Titanium design', 'Advanced camera system', '5G connectivity'],
    inStock: true,
    seller: 'Apple',
    shippingInfo: 'FREE 2-day shipping'
  },
  {
    id: '2',
    name: 'Samsung 65" QLED Smart TV',
    price: 899.99,
    originalPrice: 1299.99,
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.6,
    reviews: 1523,
    description: 'Stunning 4K QLED display with smart TV capabilities and built-in streaming.',
    features: ['4K QLED Display', 'Smart TV', 'HDR10+', 'Voice Control'],
    inStock: true,
    seller: 'Samsung',
    shippingInfo: 'FREE shipping'
  },
  {
    id: '3',
    name: 'Nike Air Max 270',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'clothing',
    rating: 4.5,
    reviews: 892,
    description: 'Comfortable and stylish running shoes with Air Max technology.',
    features: ['Air Max cushioning', 'Breathable mesh', 'Durable outsole', 'Lightweight'],
    inStock: true,
    seller: 'Nike',
    shippingInfo: 'FREE shipping on orders $35+'
  },
  {
    id: '4',
    name: 'Instant Pot Duo 7-in-1',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/4226764/pexels-photo-4226764.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.7,
    reviews: 3421,
    description: 'Multi-functional pressure cooker that replaces 7 kitchen appliances.',
    features: ['7-in-1 functionality', 'Pressure cooking', 'Slow cooking', 'Rice cooker'],
    inStock: true,
    seller: 'Instant Pot',
    shippingInfo: 'FREE shipping'
  },
  {
    id: '5',
    name: 'Organic Bananas',
    price: 2.48,
    image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'grocery',
    rating: 4.3,
    reviews: 156,
    description: 'Fresh organic bananas, perfect for snacking or baking.',
    features: ['Organic certified', 'Fresh', 'Good source of potassium', 'No pesticides'],
    inStock: true,
    seller: 'Great Value',
    shippingInfo: 'Available for pickup'
  },
  {
    id: '6',
    name: "Levi's 501 Original Jeans",
    price: 59.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'clothing',
    rating: 4.4,
    reviews: 1847,
    description: "Classic straight-leg jeans with authentic Levi's quality and style.",
    features: ['100% cotton', 'Straight fit', 'Classic styling', 'Durable construction'],
    inStock: true,
    seller: "Levi's",
    shippingInfo: 'FREE shipping on orders $35+'
  },
  {
    id: '7',
    name: 'KitchenAid Stand Mixer',
    price: 379.99,
    originalPrice: 449.99,
    image: 'https://images.pexels.com/photos/7195791/pexels-photo-7195791.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.9,
    reviews: 2156,
    description: 'Professional-grade stand mixer for all your baking and cooking needs.',
    features: ['10-speed mixing', 'Tilt-head design', 'Stainless steel bowl', 'Multiple attachments'],
    inStock: true,
    seller: 'KitchenAid',
    shippingInfo: 'FREE shipping'
  },
  {
    id: '8',
    name: 'iPad Air 5th Generation',
    price: 599.99,
    image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.7,
    reviews: 1654,
    description: 'Powerful and versatile iPad with M1 chip and stunning Liquid Retina display.',
    features: ['M1 chip', 'Liquid Retina display', 'All-day battery', 'Apple Pencil support'],
    inStock: true,
    seller: 'Apple',
    shippingInfo: 'FREE 2-day shipping'
  }
];

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query) => {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};
