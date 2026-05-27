import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Star, ShoppingCart, Heart, Shield, Check, Info, AlertTriangle, Send } from 'lucide-react';
import './PagesStyles.css';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useApp();

  // Find target product
  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [products, id]);

  // States
  const [activeTab, setActiveTab] = useState('specs');
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState(product ? product.reviews || [] : []);
  
  // Review Form States
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerAvatar, setReviewerAvatar] = useState('🧑‍💻');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Update reviews list when product changes
  React.useEffect(() => {
    if (product) {
      setReviews(product.reviews || []);
      setQty(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="page-container container page-enter" style={{ marginTop: '80px', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '60px 40px', maxWidth: '500px', margin: '0 auto' }}>
          <AlertTriangle size={48} color="var(--neon-magenta)" style={{ marginBottom: '16px' }} />
          <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Module Offline</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            The requested hardware module is not indexable in our active spatial registry.
          </p>
          <Link to="/products" className="btn-primary">
            Return to Registry
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle Qty change
  const adjustQty = (amount) => {
    setQty(prev => Math.max(1, prev + amount));
  };

  // Review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please complete all terminal review fields', 'info');
      return;
    }

    const newReview = {
      id: Date.now(),
      user: reviewerName,
      avatar: reviewerAvatar,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment
    };

    setReviews(prev => [newReview, ...prev]);
    showToast('Telemetry review synced successfully', 'success');

    // Reset Form
    setReviewerName('');
    setReviewComment('');
    setReviewRating(5);
  };

  // Compute rating breakdown
  const ratingMetrics = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, dist: {} };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((sum / reviews.length).toFixed(1));
    
    const dist = reviews.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {});

    return { avg, dist };
  }, [reviews]);

  // Related products
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [products, product]);

  const avatarsList = ['🧑‍💻', '👩‍🔬', '🤖', '⚡', '🎧', '👾', '🚀', '👽'];

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      <div className="details-grid">
        {/* Gallery Visual */}
        <div className="details-image-section">
          <div className="details-image-container glass">
            <div className="details-image-bg" />
            <img src={product.image} alt={product.name} className="details-main-image animate-float" />
          </div>
          <div className="details-gallery">
            <div className="details-gallery-thumb glass details-gallery-thumb--active" style={{ border: '1px solid var(--border-light)' }}>
              <img src={product.image} alt="product thumb" />
            </div>
          </div>
        </div>

        {/* Info Content */}
        <div className="details-info">
          <div>
            <span className="details-category">{product.category}</span>
            <h1 className="details-title font-display" style={{ marginTop: '4px' }}>{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="details-rating-row">
            <div className="details-stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(ratingMetrics.avg || product.rating) ? 'var(--neon-amber)' : 'none'} 
                  color={i < Math.floor(ratingMetrics.avg || product.rating) ? 'var(--neon-amber)' : 'var(--text-tertiary)'} 
                />
              ))}
            </div>
            <span style={{ fontWeight: '700' }}>{ratingMetrics.avg || product.rating}</span>
            <span style={{ color: 'var(--text-tertiary)' }}>({reviews.length} customer reviews)</span>
            
            {product.tag && (
              <span className={`badge ${product.tag === 'New' ? 'badge-new' : 'badge-gradient'}`} style={{ marginLeft: 'auto' }}>
                {product.tag}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="details-price-row">
            <span className="details-price">${product.price.toLocaleString()}</span>
            {discount > 0 && (
              <>
                <span className="details-original-price">${product.originalPrice.toLocaleString()}</span>
                <span className="badge badge-sale">-{discount}% OFF</span>
              </>
            )}
          </div>

          <p className="details-desc">{product.description}</p>

          {/* Calibrator options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Shield size={16} color="var(--neon-cyan)" /> 2 Year Direct Warranty
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Info size={16} color="var(--neon-cyan)" /> Real-Time Calibration
              </span>
            </div>

            <div style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Registry Availability:</span>
              <strong style={{ color: product.inStock ? 'var(--neon-green)' : 'var(--neon-magenta)' }}>
                {product.inStock ? 'INTEGRAL STOCK OK' : 'OUT OF STOCK'}
              </strong>
            </div>
          </div>

          {/* Purchase action rows */}
          {product.inStock && (
            <div className="details-actions-row">
              <div className="details-qty-selector">
                <button className="details-qty-btn" onClick={() => adjustQty(-1)}>-</button>
                <span className="details-qty-value">{qty}</span>
                <button className="details-qty-btn" onClick={() => adjustQty(1)}>+</button>
              </div>

              <button className="btn-primary details-add-btn" onClick={() => addToCart(product, qty)}>
                <ShoppingCart size={18} /> Equip Module
              </button>

              <button 
                className={`btn-secondary details-wish-btn ${wishlisted ? 'details-wish-btn--active' : ''}`} 
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={wishlisted ? 'var(--neon-magenta)' : 'none'} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Specifications & Tab Panels */}
      <div className="details-tabs">
        <div className="tabs-nav">
          <button 
            className={`tab-link ${activeTab === 'specs' ? 'tab-link--active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Technical Specifications
          </button>
          <button 
            className={`tab-link ${activeTab === 'features' ? 'tab-link--active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Spatial Features
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="glass page-enter" style={{ padding: '24px' }}>
            <table className="specs-table">
              <tbody>
                {product.specs && product.specs.map((spec, i) => {
                  const [label, value] = spec.split(':');
                  return (
                    <tr key={i}>
                      <td>{label ? label.trim() : `Attribute ${i+1}`}</td>
                      <td>{value ? value.trim() : spec}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="glass page-enter" style={{ padding: '24px' }}>
            <div className="features-list-details">
              {product.features && product.features.map((feat, i) => (
                <div key={i} className="feature-item-details">
                  <Check size={18} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reviews HUD */}
      <section className="reviews-hud">
        <h2 className="cyber-title" style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Sensory Feedback telemetry</h2>
        <div className="reviews-grid-details">
          
          {/* Summary Ratings Graph */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="reviews-summary-card glass">
              <span className="rating-huge-val">{ratingMetrics.avg || product.rating}</span>
              <div className="details-stars" style={{ justifyContent: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(ratingMetrics.avg || product.rating) ? 'var(--neon-amber)' : 'none'} 
                    color={i < Math.floor(ratingMetrics.avg || product.rating) ? 'var(--neon-amber)' : 'var(--text-tertiary)'} 
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Based on {reviews.length} active telemetry inputs
              </span>

              {/* Bars distribution */}
              <div style={{ width: '100%', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingMetrics.dist[stars] || 0;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={stars} className="rating-dist-row">
                      <span style={{ width: '12px' }}>{stars}</span>
                      <Star size={10} fill="var(--neon-amber)" color="var(--neon-amber)" />
                      <div className="rating-dist-bar">
                        <div className="rating-dist-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span style={{ width: '24px', textAlign: 'right', color: 'var(--text-tertiary)' }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write a review terminal Form */}
            <div className="write-review-card glass">
              <h3>Calibrate Feedback Node</h3>
              <form onSubmit={handleReviewSubmit} className="review-form-fields">
                <div className="star-rating-select">
                  <span>Rating:</span>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button 
                      key={val} 
                      type="button" 
                      onClick={() => setReviewRating(val)}
                    >
                      <Star 
                        size={18} 
                        fill={val <= reviewRating ? 'var(--neon-amber)' : 'none'} 
                        color={val <= reviewRating ? 'var(--neon-amber)' : 'var(--text-tertiary)'} 
                      />
                    </button>
                  ))}
                </div>

                <div className="review-form-row">
                  <label className="form-label-custom">
                    Name Node
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. Neo_Vortex"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                    />
                  </label>

                  <label className="form-label-custom">
                    Avatar Node
                    <select 
                      className="input-field" 
                      value={reviewerAvatar}
                      onChange={(e) => setReviewerAvatar(e.target.value)}
                      style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}
                    >
                      {avatarsList.map(av => (
                        <option key={av} value={av}>{av} Node Model</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="form-label-custom">
                  Sensory Report
                  <textarea 
                    className="input-field" 
                    placeholder="Enter review logs here..." 
                    rows="4"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    style={{ resize: 'none' }}
                  />
                </label>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  <Send size={16} /> Sync Logs
                </button>
              </form>
            </div>
          </div>

          {/* Feedback Timeline */}
          <div className="reviews-list-details">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.id} className="review-item-details glass animate-scale-in">
                  <div className="review-item-header">
                    <div className="review-item-user">
                      <span className="review-item-avatar">{rev.avatar || '🧑‍💻'}</span>
                      <div>
                        <h4 className="review-item-name">{rev.user}</h4>
                        <div className="details-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < rev.rating ? 'var(--neon-amber)' : 'none'} 
                              color={i < rev.rating ? 'var(--neon-amber)' : 'var(--text-tertiary)'} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="review-item-date">{rev.date}</span>
                  </div>
                  <p className="review-item-comment">&ldquo;{rev.comment}&rdquo;</p>
                </div>
              ))
            ) : (
              <div className="glass" style={{ padding: '40px', textLight: 'center', color: 'var(--text-tertiary)' }}>
                No active reviews logged in this module database. Be the first to calibrate a review feedback!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '120px' }}>
          <h2 className="cyber-title" style={{ fontSize: '1.75rem', marginBottom: '32px' }}>Related Systems</h2>
          <div className="product-grid stagger-children">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
