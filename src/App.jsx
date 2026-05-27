import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import QuickViewModal from './components/QuickViewModal';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Admin from './pages/Admin';

// Protected Route for Admin Dashboard
function ProtectedRoute({ children }) {
  const { role } = useApp();
  if (role !== 'owner') {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const { quickViewProduct, setQuickViewProduct } = useApp();

  return (
    <BrowserRouter>
      <div className="app-container animated-gradient-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation bar */}
        <Navbar />

        {/* Main Content Area */}
        <main style={{ flex: '1 0 auto', paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            
            {/* Admin page is protected */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Toast Notification System */}
        <ToastContainer />

        {/* Global Quick View Modal */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}
