import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, LayoutDashboard, Boxes, Coins, Lock, Eye, AlertTriangle } from 'lucide-react';
import './PagesStyles.css';

export default function Admin() {
  const { products, addProduct, deleteProduct, role, showToast } = useApp();

  // Form states - Add Product
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Wearables');
  const [tag, setTag] = useState('New');
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState('');
  const [specsInput, setSpecsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [selectedImage, setSelectedImage] = useState('/images/headset.png');

  // Dynamic calculations
  const stats = useMemo(() => {
    const totalItems = products.length;
    const valuation = products.reduce((sum, p) => sum + p.price, 0);
    const inStockCount = products.filter(p => p.inStock).length;
    const ratio = totalItems > 0 ? Math.round((inStockCount / totalItems) * 100) : 0;
    const uniqueCats = new Set(products.map(p => p.category)).size;

    return { totalItems, valuation, ratio, uniqueCats };
  }, [products]);

  // Secondary Role Check (Security Guard)
  if (role !== 'owner') {
    return (
      <div className="page-container container page-enter" style={{ marginTop: '80px', textAlign: 'center' }}>
        <div className="glass admin-permission-denied" style={{ padding: '60px 40px', maxWidth: '500px', margin: '0 auto' }}>
          <Lock size={48} color="var(--neon-magenta)" style={{ marginBottom: '16px', animation: 'float 4s ease-in-out infinite' }} />
          <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Security Breach Detected</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.92rem' }}>
            Access to this sector is restricted. Owner clearance code required to bypass firewall.
          </p>
          <div style={{ padding: '12px', background: 'rgba(255, 0, 128, 0.05)', border: '1px solid rgba(255, 0, 128, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--neon-magenta)' }}>
            Calibrate role switch to [OWNER] in Navbar to authenticate.
          </div>
        </div>
      </div>
    );
  }

  // Handle Form Submission - Create new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      showToast('Please provide essential module parameters', 'info');
      return;
    }

    // Process comma-separated specs & features
    const parsedSpecs = specsInput
      ? specsInput.split(',').map(s => s.trim())
      : ['Neural link: Standard Calibrated', 'Battery: Kinetic self-charging', 'Material: Graphene Gird'];
      
    const parsedFeatures = featuresInput
      ? featuresInput.split(',').map(f => f.trim())
      : ['Quantum Calibrated', 'AI Assist'];

    // Generate unique ID
    const newId = 'nxs-' + Math.floor(100 + Math.random() * 900);

    const newProduct = {
      id: newId,
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      rating: 5.0,
      reviewCount: 0,
      category,
      tag,
      inStock,
      description,
      specs: parsedSpecs,
      features: parsedFeatures,
      image: selectedImage,
      gallery: [selectedImage],
      reviews: []
    };

    // Trigger Context actions
    addProduct(newProduct);

    // Reset Form
    setName('');
    setPrice('');
    setOriginalPrice('');
    setCategory('Wearables');
    setTag('New');
    setInStock(true);
    setDescription('');
    setSpecsInput('');
    setFeaturesInput('');
    setSelectedImage('/images/headset.png');
  };

  const imagesList = [
    { label: 'Quantum Headset Model', value: '/images/headset.png' },
    { label: 'Spatial Deck Graphene', value: '/images/laptop.png' },
    { label: 'Chronos Smartwatch', value: '/images/smartwatch.png' },
    { label: 'Plasma Ion Speaker', value: '/images/speaker.png' },
    { label: 'Ultrawide Spectra Prism', value: '/images/monitor.png' },
    { label: 'Synapse Wireless Buds', value: '/images/earbuds.png' }
  ];

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      {/* Title */}
      <div className="page-title-section">
        <h1 className="cyber-title">Owner Administration HUD</h1>
        <p>Real-time telemetry control center, catalog metrics, and inventory calibration pipelines.</p>
      </div>

      <div className="admin-hud">
        {/* Stats grid */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card glass">
            <div className="admin-stat-icon"><Boxes size={20} /></div>
            <div>
              <div className="admin-stat-label">Active Modules</div>
              <div className="admin-stat-value">{stats.totalItems}</div>
            </div>
          </div>
          <div className="admin-stat-card glass">
            <div className="admin-stat-icon"><Coins size={20} /></div>
            <div>
              <div className="admin-stat-label">Total Matrix Value</div>
              <div className="admin-stat-value">${stats.valuation.toLocaleString()}</div>
            </div>
          </div>
          <div className="admin-stat-card glass">
            <div className="admin-stat-icon"><LayoutDashboard size={20} /></div>
            <div>
              <div className="admin-stat-label">In-Stock Ratio</div>
              <div className="admin-stat-value">{stats.ratio}%</div>
            </div>
          </div>
          <div className="admin-stat-card glass">
            <div className="admin-stat-icon"><Eye size={20} /></div>
            <div>
              <div className="admin-stat-label">Departments</div>
              <div className="admin-stat-value">{stats.uniqueCats}</div>
            </div>
          </div>
        </section>

        {/* Layout Split */}
        <div className="admin-layout-split">
          
          {/* Active Items Table */}
          <div className="admin-items-card glass">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontFamily: 'var(--font-display)', color: 'var(--neon-cyan)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              Active Spatial Registry
            </h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Dept</th>
                    <th>Credits</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'center' }}>Purge</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="animate-scale-in">
                      <td>
                        <div className="admin-table-product">
                          <div className="admin-table-thumb">
                            <img src={p.image} alt={p.name} />
                          </div>
                          <span style={{ fontWeight: '600' }}>{p.name.slice(0, 20)}...</span>
                        </div>
                      </td>
                      <td><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.category}</span></td>
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }}>${p.price}</td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: p.inStock ? 'var(--neon-green)' : 'var(--neon-magenta)' }}>
                          {p.inStock ? 'ACTIVE' : 'OUT'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="admin-delete-btn" onClick={() => deleteProduct(p.id)} aria-label={`Delete ${p.name}`}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Product Form */}
          <div className="admin-form-panel glass">
            <h2>Integrate New Technology Module</h2>
            <form onSubmit={handleAddProduct} className="review-form-fields">
              
              <label className="form-label-custom">
                Module Code Name
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Spectra Prism V2" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <div className="admin-form-row-2">
                <label className="form-label-custom">
                  Active Price (Credits)
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="e.g. 899" 
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>
                <label className="form-label-custom">
                  Original Price
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="e.g. 1200" 
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </label>
              </div>

              <div className="admin-form-row-2">
                <label className="form-label-custom">
                  Frequency Layer (Dept)
                  <select 
                    className="input-field" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}
                  >
                    <option value="Wearables">Wearables</option>
                    <option value="Computing">Computing</option>
                    <option value="Audio">Audio</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Drones">Drones</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </label>
                <label className="form-label-custom">
                  Badge Tag
                  <select 
                    className="input-field" 
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}
                  >
                    <option value="New">New</option>
                    <option value="Trending">Trending</option>
                    <option value="Sale">Sale</option>
                    <option value="Hot">Hot</option>
                    <option value="Popular">Popular</option>
                    <option value="Limited">Limited</option>
                  </select>
                </label>
              </div>

              <label className="form-label-custom">
                Sensory Image Asset Allocation
                <select 
                  className="input-field" 
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}
                >
                  {imagesList.map(img => (
                    <option key={img.value} value={img.value}>{img.label}</option>
                  ))}
                </select>
              </label>

              <label className="form-label-custom">
                Core Description Logs
                <textarea 
                  className="input-field" 
                  placeholder="Summarize visual and processing specs..." 
                  rows="3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </label>

              <label className="form-label-custom">
                Technical Specifications (comma-separated)
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Core: 8.4 GHz, RAM: 64GB, Connectivity: BT 6.0" 
                  value={specsInput}
                  onChange={(e) => setSpecsInput(e.target.value)}
                />
              </label>

              <label className="form-label-custom">
                Key Highlights (comma-separated)
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Active ANC, Neural interface, Kinetic Solar" 
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                />
              </label>

              <label className="checkbox-label" style={{ marginTop: '8px' }}>
                <input 
                  type="checkbox" 
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                <span className="custom-checkbox" />
                <span>Initialize Module as Fully Stocked</span>
              </label>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                <Plus size={16} /> Integrate Module
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
