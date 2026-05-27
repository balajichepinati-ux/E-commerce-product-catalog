import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/products';
import { ArrowRight, Layers } from 'lucide-react';
import './PagesStyles.css';

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Navigate to products catalog page with category state pre-configured!
    navigate('/products', { state: { category: categoryName } });
  };

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      {/* Title */}
      <div className="page-title-section">
        <h1 className="cyber-title">Department Matrix</h1>
        <p>Browse spatial technology systems divided by functional frequency layers.</p>
      </div>

      <div className="categories-grid-details stagger-children">
        {categories.map((cat) => (
          <article 
            key={cat.name} 
            className="category-row-card glass hover-lift"
            onClick={() => handleCategoryClick(cat.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="category-row-header">
              <span className="category-row-icon">{cat.icon}</span>
              <span className="category-row-count-badge font-display">{cat.count} SYSTEMS</span>
            </div>
            
            <div>
              <h3 className="category-row-name font-display">{cat.name}</h3>
              <p className="category-row-desc" style={{ marginTop: '8px' }}>{cat.description}</p>
            </div>

            <button 
              className="category-row-link" 
              onClick={(e) => { e.stopPropagation(); handleCategoryClick(cat.name); }}
              style={{ background: 'transparent', border: 'none', textAlign: 'left', padding: '0' }}
            >
              Calibrate Filter <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
