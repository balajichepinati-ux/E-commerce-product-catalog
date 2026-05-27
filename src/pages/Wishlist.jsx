import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import './PagesStyles.css';

export default function Wishlist() {
  const { wishlist } = useApp();

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      {/* Title */}
      <div className="page-title-section">
        <h1 className="cyber-title">Wishlist Registry</h1>
        <p>Your calibrated sensory hardware modules, bookmarked for quick procurement access.</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="product-grid stagger-children">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="wishlist-empty-state glass animate-scale-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="wishlist-empty-icon">
            <Heart size={36} fill="var(--neon-magenta)" />
          </div>
          <h2 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Wishlist Unoccupied</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.92rem' }}>
            No technology nodes are bookmarked in your active memory banks. Let's calibrate selections.
          </p>
          <Link to="/products" className="btn-primary">
            Equip Workspace <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
