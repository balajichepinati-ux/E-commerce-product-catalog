import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const wishlisted = isInWishlist(product.id);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-card-wrap"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <article className="product-card glass">
        {/* Badge */}
        <div className="product-card__badges">
          {discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
          <span className={`badge ${product.tag === 'New' ? 'badge-new' : 'badge-gradient'}`}>
            {product.tag}
          </span>
        </div>

        {/* Wishlist Toggle */}
        <button
          className={`product-card__wishlist-btn ${wishlisted ? 'product-card__wishlist-btn--active' : ''}`}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? 'var(--neon-magenta)' : 'none'} />
        </button>

        {/* Image */}
        <Link to={`/product/${product.id}`} className="product-card__image-wrap">
          <div className="product-card__image-bg" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="product-card__image"
          />
          {/* Hover Actions */}
          <div className="product-card__actions">
            <button
              className="product-card__action-btn"
              onClick={(e) => { e.preventDefault(); onQuickView && onQuickView(product); }}
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
            <button
              className="product-card__action-btn product-card__action-btn--primary"
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="product-card__content">
          <span className="product-card__category">{product.category}</span>
          <Link to={`/product/${product.id}`} className="product-card__name">
            {product.name}
          </Link>

          {/* Rating */}
          <div className="product-card__rating">
            <div className="product-card__stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'var(--neon-amber)' : 'none'}
                  color={i < Math.floor(product.rating) ? 'var(--neon-amber)' : 'var(--text-tertiary)'}
                />
              ))}
            </div>
            <span className="product-card__review-count">({product.reviewCount?.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="product-card__price-row">
            <span className="product-card__price">${product.price.toLocaleString()}</span>
            {discount > 0 && (
              <span className="product-card__original-price">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
