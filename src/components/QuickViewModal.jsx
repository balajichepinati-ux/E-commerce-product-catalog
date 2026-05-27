import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './QuickViewModal.css';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const wishlisted = isInWishlist(product.id);

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="qv-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      <div className="qv-modal glass-strong animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close" onClick={onClose} aria-label="Close quick view">
          <X size={22} />
        </button>

        <div className="qv-grid">
          {/* Image */}
          <div className="qv-image-section">
            <div className="qv-image-bg" />
            <img src={product.image} alt={product.name} className="qv-image" />
          </div>

          {/* Info */}
          <div className="qv-info">
            <span className="qv-category">{product.category}</span>
            {discount > 0 && <span className="badge badge-sale qv-discount">-{discount}% OFF</span>}
            
            <h2 className="qv-name font-display">{product.name}</h2>
            
            <div className="qv-rating">
              <div className="qv-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--neon-amber)' : 'none'} color={i < Math.floor(product.rating) ? 'var(--neon-amber)' : 'var(--text-tertiary)'} />
                ))}
              </div>
              <span>{product.rating}</span>
              <span className="qv-review-count">({product.reviewCount?.toLocaleString()} reviews)</span>
            </div>

            <p className="qv-description">{product.description}</p>

            <div className="qv-price-section">
              <span className="qv-price">${product.price.toLocaleString()}</span>
              {discount > 0 && (
                <span className="qv-original-price">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="qv-features">
                {product.features.slice(0, 4).map((feat, i) => (
                  <span key={i} className="qv-feature-tag">{feat}</span>
                ))}
              </div>
            )}

            <div className="qv-actions">
              <button className="btn-primary qv-add-btn" onClick={() => { addToCart(product); onClose(); }}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className={`btn-icon qv-wish-btn ${wishlisted ? 'qv-wish-btn--active' : ''}`} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist">
                <Heart size={18} fill={wishlisted ? 'var(--neon-magenta)' : 'none'} />
              </button>
            </div>

            <Link to={`/product/${product.id}`} className="qv-details-link" onClick={onClose}>
              View Full Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
