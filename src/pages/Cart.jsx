import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, ShieldCheck, CreditCard, CheckCircle2, ArrowRight, Printer, AlertTriangle, X } from 'lucide-react';
import './PagesStyles.css';

export default function Cart() {
  const { cart, cartTotal, updateCartQty, removeFromCart, clearCart, showToast } = useApp();
  const navigate = useNavigate();

  // Multi-step Checkout Modal States
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Fields - Shipping
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingZip, setShippingZip] = useState('');

  // Form Fields - Payment
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Order Invoice Details
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceTotals, setInvoiceTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });

  // Calculate pricing breakdown
  const pricing = useMemo(() => {
    const shipping = cartTotal > 1000 ? 0 : 25;
    const tax = Math.round(cartTotal * 0.08);
    const total = cartTotal + shipping + tax;
    return { shipping, tax, total };
  }, [cartTotal]);

  if (cart.length === 0 && !checkoutOpen) {
    return (
      <div className="page-container container page-enter" style={{ marginTop: '80px', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '60px 40px', maxWidth: '500px', margin: '0 auto' }}>
          <ShoppingBag size={48} color="var(--neon-cyan)" style={{ marginBottom: '16px' }} />
          <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Cart Unoccupied</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Your workspace has no allocated hardware modules. Let's add telemetry systems.
          </p>
          <Link to="/products" className="btn-primary">
            Launch Catalog Explorer
          </Link>
        </div>
      </div>
    );
  }

  // Next Step - Shipping to Payment
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingAddress || !shippingCity || !shippingCountry || !shippingZip) {
      showToast('Please provide all shipping telemetry parameters', 'info');
      return;
    }
    setStep(2);
  };

  // Process Checkout
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      showToast('Please fill all biometric payment attributes', 'info');
      return;
    }

    setLoading(true);

    // Simulate quantum transaction validation
    setTimeout(() => {
      setLoading(false);
      setInvoiceId('NXS-' + Math.floor(10000000 + Math.random() * 90000000));
      setInvoiceDate(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
      setInvoiceItems([...cart]);
      setInvoiceTotals({
        subtotal: cartTotal,
        shipping: pricing.shipping,
        tax: pricing.tax,
        total: pricing.total
      });

      // Clear actual active cart in context
      clearCart();
      
      setStep(3);
      showToast('Quantum credits transferred successfully', 'success');
    }, 1500);
  };

  // Close Checkout Modal
  const closeCheckout = () => {
    setCheckoutOpen(false);
    setStep(1);
    // Reset Form
    setShippingName('');
    setShippingEmail('');
    setShippingAddress('');
    setShippingCity('');
    setShippingCountry('');
    setShippingZip('');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  return (
    <div className="page-container container page-enter" style={{ marginTop: '40px' }}>
      <div className="page-title-section">
        <h1 className="cyber-title">Cart Terminal</h1>
        <p>Review and calibrate your sensory workspace modules before checkout clearance.</p>
      </div>

      <div className="cart-layout">
        {/* Left List */}
        <div className="cart-items-section">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-row glass animate-scale-in">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name font-display">{item.name}</Link>
                <span className="cart-item-category">{item.category}</span>
              </div>
              
              {/* Qty controls */}
              <div className="cart-item-qty">
                <button className="cart-item-qty-btn" onClick={() => updateCartQty(item.id, item.qty - 1)}>-</button>
                <span className="cart-item-qty-val">{item.qty}</span>
                <button className="cart-item-qty-btn" onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
              </div>

              {/* Price & Remove */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="cart-item-price-side">
                  <span className="cart-item-total-price font-display">${(item.price * item.qty).toLocaleString()}</span>
                  <span className="cart-item-unit-price">${item.price.toLocaleString()} each</span>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Summary */}
        <aside className="cart-summary-card glass">
          <h2 className="summary-title font-display">Quantum Matrix</h2>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Modules Allocation</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Hyper-shipping</span>
              <span>{pricing.shipping === 0 ? <strong style={{ color: 'var(--neon-green)' }}>FREE</strong> : `$${pricing.shipping.toLocaleString()}`}</span>
            </div>
            <div className="summary-row">
              <span>Energy Matrix Tax (8%)</span>
              <span>${pricing.tax.toLocaleString()}</span>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total Matrix</span>
              <span className="text-glow" style={{ color: 'var(--neon-cyan)' }}>${pricing.total.toLocaleString()}</span>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setCheckoutOpen(true)}>
            Initiate Clearance <ArrowRight size={18} />
          </button>
        </aside>
      </div>

      {/* MULTI-STEP CHECKOUT WIZARD MODAL */}
      {checkoutOpen && (
        <div className="checkout-modal-overlay animate-fade-in" onClick={closeCheckout}>
          <div className="checkout-modal glass-strong animate-scale-in" onClick={(e) => e.stopPropagation()}>
            
            <div className="checkout-modal__header">
              <h2 className="font-display" style={{ fontSize: '1.25rem' }}>Checkout clearance terminal</h2>
              <button className="checkout-modal__close" onClick={closeCheckout} aria-label="Close modal">
                <X size={22} />
              </button>
            </div>

            <div className="checkout-modal__body">
              {/* Progress bar */}
              <div className="checkout-progress">
                <div 
                  className="checkout-progress-bar-fill" 
                  style={{ width: step === 1 ? '16%' : step === 2 ? '50%' : '100%' }} 
                />
                <div className={`checkout-step-indicator ${step === 1 ? 'checkout-step-indicator--active' : step > 1 ? 'checkout-step-indicator--completed' : ''}`}>
                  <div className="step-circle">1</div>
                  <span className="step-label">Shipping</span>
                </div>
                <div className={`checkout-step-indicator ${step === 2 ? 'checkout-step-indicator--active' : step > 2 ? 'checkout-step-indicator--completed' : ''}`}>
                  <div className="step-circle">2</div>
                  <span className="step-label">Credits</span>
                </div>
                <div className={`checkout-step-indicator ${step === 3 ? 'checkout-step-indicator--active' : ''}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">Invoice</span>
                </div>
              </div>

              {/* STEP 1: SHIPPING DETAILS */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="review-form-fields animate-fade-in">
                  <h3 className="font-display" style={{ fontSize: '1.05rem', color: 'var(--neon-cyan)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '8px' }}>
                    Telemetry Address Node
                  </h3>
                  
                  <label className="form-label-custom">
                    Recipient Full Name
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. Balaji Rao" 
                      required
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                    />
                  </label>

                  <label className="form-label-custom">
                    Communication Email Node
                    <input 
                      type="email" 
                      className="input-field" 
                      placeholder="e.g. balaji@vortex.net" 
                      required
                      value={shippingEmail}
                      onChange={(e) => setShippingEmail(e.target.value)}
                    />
                  </label>

                  <label className="form-label-custom">
                    Physical Grid Address
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Street address, Sector 4..." 
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </label>

                  <div className="review-form-row">
                    <label className="form-label-custom">
                      City
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="New Bombay" 
                        required
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                      />
                    </label>
                    <label className="form-label-custom">
                      ZIP/Grid Code
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="400018" 
                        required
                        value={shippingZip}
                        onChange={(e) => setShippingZip(e.target.value)}
                      />
                    </label>
                  </div>

                  <label className="form-label-custom">
                    Territory/Country
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="India" 
                      required
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                    />
                  </label>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                    Proceed to Credit Transfer <ArrowRight size={16} />
                  </button>
                </form>
              )}

              {/* STEP 2: CREDIT MATRIX / CARD DETAILS */}
              {step === 2 && (
                <form onSubmit={handlePaymentSubmit} className="review-form-fields animate-fade-in">
                  
                  {/* Dynamic payment card preview */}
                  <div className="payment-card-preview">
                    <div className="payment-card-preview__glow" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="payment-card-preview__chip" />
                      <span className="font-display" style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--neon-cyan)' }}>VORTEX SECURE</span>
                    </div>
                    <div className="payment-card-preview__number">
                      {cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim().slice(0, 19) : '•••• •••• •••• ••••'}
                    </div>
                    <div className="payment-card-preview__footer">
                      <div>
                        <div className="payment-card-preview__label">Cardholder</div>
                        <div className="payment-card-preview__value">{cardName || 'YOUR COGNOMEN'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="payment-card-preview__label">Expiry</div>
                        <div className="payment-card-preview__value">{cardExpiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display" style={{ fontSize: '1.05rem', color: 'var(--neon-cyan)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '8px' }}>
                    Credit Matrix Authentication
                  </h3>

                  <label className="form-label-custom">
                    Cardholder Cognomen
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. Balaji Rao" 
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </label>

                  <label className="form-label-custom">
                    Credit Matrix Card Number
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="4000 1234 5678 9010" 
                      maxLength="16"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    />
                  </label>

                  <div className="review-form-row">
                    <label className="form-label-custom">
                      Expiry Date
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="MM/YY" 
                        maxLength="5"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </label>
                    <label className="form-label-custom">
                      CVV Code
                      <input 
                        type="password" 
                        className="input-field" 
                        placeholder="•••" 
                        maxLength="3"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button type="button" className="btn-secondary" onClick={() => setStep(1)} style={{ flex: '1' }}>
                      Back
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ flex: '2' }}>
                      {loading ? 'Validating credits...' : `Authorize $${pricing.total.toLocaleString()}`}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: ORDER INVOICE SUCCESS */}
              {step === 3 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={48} color="var(--neon-green)" className="animate-scale-in" />
                    <h3 className="font-display" style={{ fontSize: '1.25rem' }}>Calibration Complete</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px' }}>
                      Telemetry products compiled and authorized for spatial shipping delivery.
                    </p>
                  </div>

                  {/* Digital invoice card */}
                  <div className="invoice-card">
                    <div className="invoice-header">
                      <div>
                        <div className="invoice-logo">NEXUS VORTEX</div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>SPATIAL LOGISTICS TERMINAL</span>
                      </div>
                      <div className="invoice-id-box">
                        <strong>Invoice ID:</strong> {invoiceId}
                        <br />
                        <strong>Timestamp:</strong> {invoiceDate}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <strong style={{ color: 'var(--neon-cyan)' }}>SHIPPING TO:</strong>
                        <br />
                        {shippingName}
                        <br />
                        {shippingAddress}, {shippingCity}
                        <br />
                        {shippingCountry} - {shippingZip}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong style={{ color: 'var(--neon-cyan)' }}>PAYMENT AUTH:</strong>
                        <br />
                        Vortex Secure Gateway
                        <br />
                        Cardholder: {cardName}
                        <br />
                        Card Type: Integrated Matrix credit
                      </div>
                    </div>

                    {/* Invoice list */}
                    <table className="invoice-table">
                      <thead>
                        <tr>
                          <th>Allocated module</th>
                          <th style={{ textAlign: 'center' }}>Qty</th>
                          <th>Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItems.map((it) => (
                          <tr key={it.id}>
                            <td>{it.name}</td>
                            <td style={{ textAlign: 'center' }}>{it.qty}</td>
                            <td>${(it.price * it.qty).toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="invoice-total-row">
                          <td colSpan="2">Matric Total Credits</td>
                          <td>${invoiceTotals.total.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-tertiary)', borderTop: '1px dashed var(--border-subtle)', paddingTop: '12px' }}>
                      THANK YOU FOR USING THE SPATIAL MARKETPLACE. SYSTEM OPERATIONAL.
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-secondary" onClick={() => window.print()} style={{ flex: '1' }}>
                      <Printer size={16} /> Print Invoice
                    </button>
                    <button className="btn-primary" onClick={closeCheckout} style={{ flex: '1' }}>
                      Complete Calibration
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
