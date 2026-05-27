import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';
import './PagesStyles.css';

export default function Products() {
  const { products } = useApp();
  const location = useLocation();

  // ── States ──
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Handle deep-links or route state (e.g. from categories page)
  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location]);

  // Categories list with counts
  const categoriesList = useMemo(() => {
    const counts = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    
    return [
      { name: 'All', count: products.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count }))
    ];
  }, [products]);

  // Tags list
  const tagsList = ['Trending', 'New', 'Sale', 'Hot', 'Popular', 'Limited'];

  // Toggle selected tags
  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTags([]);
    setPriceRange({ min: 0, max: 3000 });
    setOnlyInStock(false);
    setSortBy('featured');
  };

  // ── Filter & Sort Logic ──
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Search Query Filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(query);
          const matchesDesc = product.description.toLowerCase().includes(query);
          if (!matchesName && !matchesDesc) return false;
        }

        // Price Filter
        if (product.price < priceRange.min || product.price > priceRange.max) {
          return false;
        }

        // Tags Filter
        if (selectedTags.length > 0 && !selectedTags.includes(product.tag)) {
          return false;
        }

        // Stock Filter
        if (onlyInStock && !product.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting Logic
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return 0; // standard order
      });
  }, [products, searchQuery, selectedCategory, selectedTags, priceRange, onlyInStock, sortBy]);

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      {/* Title */}
      <div className="page-title-section">
        <h1 className="cyber-title">Spatial Catalog</h1>
        <p>Browse and calibrate your future sensory workspace setup with active filters.</p>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar glass">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.95rem' }}>
              <SlidersHorizontal size={18} color="var(--neon-cyan)" /> CALIBRATION
            </span>
            <button 
              onClick={handleClearFilters}
              style={{ background: 'transparent', border: 'none', color: 'var(--neon-magenta)', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.5px' }}
            >
              RESET ALL
            </button>
          </div>

          {/* Search */}
          <div className="filter-group">
            <h4 className="filter-group__title">Neural Search</h4>
            <div className="search-wrapper">
              <Search size={16} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search specs, names..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4 className="filter-group__title">Categories</h4>
            <div className="filter-list">
              {categoriesList.map((cat) => (
                <button
                  key={cat.name}
                  className={`filter-btn-row ${selectedCategory === cat.name ? 'filter-btn-row--active' : ''}`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <span>{cat.name}</span>
                  <span className="filter-btn-row__count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4 className="filter-group__title">Credit Matrix</h4>
            <div style={{ padding: '0 8px' }}>
              <input 
                type="range" 
                min="0" 
                max="3000" 
                step="50"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--neon-cyan)', cursor: 'pointer' }}
              />
              <div className="price-range-inputs">
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                />
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="filter-group">
            <h4 className="filter-group__title">Sensor Tags</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {tagsList.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      border: '1px solid',
                      borderColor: active ? 'var(--neon-cyan)' : 'var(--border-subtle)',
                      background: active ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                      color: active ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock Status */}
          <div className="filter-group">
            <h4 className="filter-group__title">Calibration Status</h4>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <span className="custom-checkbox" />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Catalog Main View */}
        <main>
          {/* Controls Bar */}
          <div className="catalog-header glass">
            <span className="catalog-header__results">
              Showing <strong style={{ color: 'var(--neon-cyan)' }}>{filteredProducts.length}</strong> items of {products.length}
            </span>
            <div className="catalog-header__sort">
              <ArrowUpDown size={16} color="var(--text-tertiary)" />
              <span>Sort:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Default Calibration</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Expert Rating</option>
                <option value="reviews">Review Frequency</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {(selectedCategory !== 'All' || selectedTags.length > 0 || searchQuery !== '' || onlyInStock || priceRange.min > 0 || priceRange.max < 3000) && (
            <div className="active-chips">
              {selectedCategory !== 'All' && (
                <span className="chip">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><X size={12} /></button>
                </span>
              )}
              {searchQuery !== '' && (
                <span className="chip">
                  Query: &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="chip">
                  Tag: {tag}
                  <button onClick={() => handleTagToggle(tag)}><X size={12} /></button>
                </span>
              ))}
              {onlyInStock && (
                <span className="chip">
                  In Stock Only
                  <button onClick={() => setOnlyInStock(false)}><X size={12} /></button>
                </span>
              )}
              {(priceRange.min > 0 || priceRange.max < 3000) && (
                <span className="chip">
                  Price: ${priceRange.min} - ${priceRange.max}
                  <button onClick={() => setPriceRange({ min: 0, max: 3000 })}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid stagger-children">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty glass">
              <div className="catalog-empty__icon">
                <SlidersHorizontal size={32} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.25rem' }}>Calibration Yielded No Results</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', fontSize: '0.9rem' }}>
                No hardware modules found fitting these exact neural parameters. Try expanding your matrices.
              </p>
              <button className="btn-primary" onClick={handleClearFilters} style={{ marginTop: '16px' }}>
                Re-Calibrate Filter Systems
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
