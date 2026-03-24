export const categoryImageMap = {
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
  fragrances: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop",
  furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
  groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop",
  "home-decoration": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
  "kitchen-accessories": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
  laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
  "mens-shirts": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop",
  "mens-shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
  "mens-watches": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
  "mobile-accessories": "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300&h=300&fit=crop",
  motorcycle: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&h=300&fit=crop",
  "skin-care": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
  smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
  "sports-accessories": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=300&fit=crop",
  sunglasses: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
  tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
  tops: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=300&fit=crop",
  vehicle: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=300&fit=crop",
  "womens-bags": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
  "womens-dresses": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop",
  "womens-jewellery": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
  "womens-shoes": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop",
  "womens-watches": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&h=300&fit=crop",
};

export const getCategoryImage = (slug) =>
  categoryImageMap[slug] ||
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=300&fit=crop";
