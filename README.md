# Modern E-Commerce Application

A complete, production-ready E-commerce web application built with React, Redux Saga, and Axios, using the DummyJSON Products API.

## Features

- **Full Catalog**: Browse, search, and filter products from various categories.
- **Advanced Filtering**: Filter by category, price range, and sort by price or rating.
- **Product Details**: Detailed view with image gallery and specifications.
- **Cart Management**: Add/remove items and update quantities with persistent storage.
- **Wishlist**: Save your favorite items for later.
- **Authentication**: Login and Signup UI with basic validation.
- **Dark Mode**: Fully responsive UI with persistent dark mode support.
- **Mobile First**: Optimized for all screen sizes with pure CSS.

## Tech Stack

- **Frontend**: React.js (Vite)
- **State Management**: Redux Toolkit + Redux Saga
- **Routing**: React Router DOM v6
- **Styling**: Pure CSS (Modern Flexbox & Grid)
- **API**: Axios (DummyJSON API)
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd technical-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  components/  # Reusable UI components
  pages/       # Page components (Home, Shop, etc.)
  redux/       # Redux slices and Sagas
  services/    # API service layer (Axios)
  hooks/       # Custom React hooks
  utils/       # Utility functions
  assets/      # Images and static assets
  styles/      # Component and global CSS
```

## API Reference

This project uses the [DummyJSON API](https://dummyjson.com/docs/products).

- `GET /products`: Fetch products
- `GET /products/:id`: Fetch single product
- `GET /products/search?q=`: Search products
- `GET /products/categories`: Fetch categories
- `GET /products/category/:category`: Fetch products by category

## License

This project is licensed under the MIT License.
