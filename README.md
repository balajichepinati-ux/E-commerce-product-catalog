# 🛍️ E-Commerce Product Catalog

A modern, feature-rich e-commerce product catalog application built with React and Vite. Browse products, manage your shopping cart, create wishlists, and experience a seamless online shopping platform.

## ✨ Features

- **Product Browsing**: Explore a comprehensive catalog of electronics with detailed product information
- **Quick View**: Instantly preview product details in a modal without navigation
- **Shopping Cart**: Add/remove products and manage quantities with persistent storage
- **Wishlist**: Save your favorite products for later
- **Product Categories**: Filter products by different categories
- **Search Functionality**: Find products quickly and efficiently
- **Admin Panel**: Manage products and inventory
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Product Details Page**: In-depth information about each product

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.x
- **Build Tool**: Vite
- **Language**: JavaScript & TypeScript
- **Styling**: CSS3
- **State Management**: React Context API
- **Deployment**: Vercel
- **Package Manager**: npm

## 📋 Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/balajichepinati-ux/E-commerce-product-catalog.git
   cd E-commerce-product-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📦 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint (if configured)

## 📁 Project Structure

```
E-commerce-product-catalog/
├── public/
│   ├── images/              # Product images
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuickViewModal.jsx
│   │   ├── Toast.jsx
│   │   └── Footer.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Categories.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Admin.jsx
│   ├── context/             # React Context for state management
│   │   └── AppContext.jsx
│   ├── data/                # Mock data
│   │   └── products.js
│   ├── styles/              # Global styles
│   │   └── global.css
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Application entry point
├── index.html
├── vite.config.js           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
└── vercel.json              # Vercel deployment config
```

## 🎯 Key Components

### Navbar
Navigation component with links to all pages and cart/wishlist indicators

### ProductCard
Reusable component displaying individual products with quick view and add to cart options

### QuickViewModal
Modal dialog for previewing product details without leaving the current page

### Cart Management
Full shopping cart functionality with quantity updates and checkout preparation

### Wishlist
Save favorite products for future purchase consideration

### Admin Panel
Manage product inventory and catalog (admin features)

## 🔧 Customization

### Adding New Products
Edit the products data in `src/data/products.js` to add or modify products

### Styling
- Global styles: `src/styles/global.css`
- Component-specific styles: Located alongside respective components (e.g., `ProductCard.css`)

### Environment Configuration
Modify `vite.config.js` for build and development configurations

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy on every push
4. Configuration is handled by `vercel.json`

```bash
npm run build  # Build before deployment
```

## 🎨 Features in Detail

### Quick View Modal
Click the "Quick View" button on any product to see details without navigation

### Add to Cart
Products can be added to cart directly from:
- Product cards
- Quick view modal
- Product details page

### Wishlist Management
- Add products to wishlist from any product view
- View all wishlist items on the Wishlist page
- Move items from wishlist to cart

### Categories
Filter products by:
- Electronics
- Accessories
- Tech Gadgets

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email balajichepinati@gmail.com or open an issue in the repository.

## 🙏 Acknowledgments

- Built with React and Vite
- Icons from public resources
- Deployed on Vercel

---

**Happy Shopping! 🛒**

Visit the live application and explore our product catalog today!
