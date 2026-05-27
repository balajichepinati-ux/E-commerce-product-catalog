import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, ShieldCheck, Truck, Star, ChevronRight, Send } from 'lucide-react';
import { heroStats, testimonials } from '../data/products';
import './Home.css';

export default function Home() {
  const { products } = useApp();
  const featured = products.slice(0, 4);
  const trending = products.filter(p => p.tag === 'Trending' || p.tag === 'Hot').slice(0, 3);
  const heroRef = useRef(null);

  // Parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home page-enter">
      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="hero__bg-orbs">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        <div className="hero__content container">
          <div className="hero__text">
            <div className="hero__status badge-outline">
              <span className="hero__status-dot" />
              SYSTEM OPERATIONAL — v4.8 LIVE
            </div>

            <h1 className="hero__title">
              <span className="cyber-title">Next-Gen</span>
              <br />
              <span className="hero__title-main">Spatial Hardware</span>
              <br />
              <span className="hero__title-accent gradient-text">Marketplace</span>
            </h1>

            <p className="hero__description">
              Equip your workspace with premium glassmorphic computing modules,
              spatial audio systems, and neural-synchronized wearables.
              Experience technology from the future, available today.
            </p>

            <div className="hero__cta">
              <Link to="/products" className="btn-primary hero__cta-btn">
                Explore Catalog <ArrowRight size={18} />
              </Link>
              <Link to="/categories" className="btn-secondary hero__cta-btn">
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="hero__stats">
              {heroStats.map((stat, i) => (
                <div key={i} className="hero__stat">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero 3D Visual */}
          <div className="hero__visual" ref={heroRef}>
            <div className="hero__visual-card glass">
              <div className="hero__visual-glow" />
              <img
                src="/images/headset.png"
                alt="Featured Product"
                className="hero__visual-image animate-float"
              />
              <div className="hero__visual-tag font-display">FEATURED</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Metrics ── */}
      <section className="trust container">
        <div className="trust__grid stagger-children">
          <div className="trust__card glass hover-lift">
            <div className="trust__icon-wrap trust__icon-wrap--cyan">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="trust__title font-display">Instant Delivery</h4>
              <p className="trust__desc">Sub-second distribution pipelines worldwide.</p>
            </div>
          </div>
          <div className="trust__card glass hover-lift">
            <div className="trust__icon-wrap trust__icon-wrap--magenta">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="trust__title font-display">Secure Payments</h4>
              <p className="trust__desc">End-to-end encrypted transactions.</p>
            </div>
          </div>
          <div className="trust__card glass hover-lift">
            <div className="trust__icon-wrap trust__icon-wrap--purple">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="trust__title font-display">Free Returns</h4>
              <p className="trust__desc">30-day hassle-free return policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="featured container section-spacing">
        <div className="section-header">
          <div>
            <h2 className="cyber-title section-header__title">Featured Products</h2>
            <p className="section-header__subtitle">
              Top-performing premium tech, curated for excellence.
            </p>
          </div>
          <Link to="/products" className="section-header__link">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="product-grid stagger-children">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Promotional Banner ── */}
      <section className="promo container">
        <div className="promo__card glass">
          <div className="promo__glow" />
          <div className="promo__content">
            <span className="badge badge-sale">LIMITED OFFER</span>
            <h2 className="promo__title font-display">Summer Tech Sale</h2>
            <p className="promo__desc">
              Up to 30% off on select premium hardware. Upgrade your setup
              with cutting-edge technology at unbeatable prices.
            </p>
            <Link to="/products" className="btn-primary">
              Shop the Sale <ArrowRight size={18} />
            </Link>
          </div>
          <div className="promo__image-wrap">
            <img src="/images/laptop.png" alt="Sale Product" className="promo__image animate-float" />
          </div>
        </div>
      </section>

      {/* ── Trending Products ── */}
      {trending.length > 0 && (
        <section className="featured container section-spacing">
          <div className="section-header">
            <div>
              <h2 className="cyber-title section-header__title">Trending Now</h2>
              <p className="section-header__subtitle">
                The most popular products this week.
              </p>
            </div>
          </div>
          <div className="product-grid stagger-children">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <section className="testimonials container section-spacing">
        <div className="section-header">
          <div>
            <h2 className="cyber-title section-header__title">What Our Customers Say</h2>
            <p className="section-header__subtitle">
              Real reviews from real people who love our products.
            </p>
          </div>
        </div>
        <div className="testimonials__grid stagger-children">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card glass hover-lift">
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--neon-amber)" color="var(--neon-amber)" />
                ))}
              </div>
              <p className="testimonial-card__comment">&ldquo;{t.comment}&rdquo;</p>
              <div className="testimonial-card__author">
                <span className="testimonial-card__avatar">{t.avatar}</span>
                <div>
                  <h4 className="testimonial-card__name">{t.name}</h4>
                  <span className="testimonial-card__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="newsletter container">
        <div className="newsletter__card glass">
          <div className="newsletter__glow" />
          <h2 className="newsletter__title font-display">Stay Connected</h2>
          <p className="newsletter__desc">
            Subscribe to receive exclusive offers, product launches, and tech insights
            delivered directly to your inbox.
          </p>
          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              className="input-field newsletter__input"
              placeholder="Enter your email address"
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary newsletter__btn">
              <Send size={16} /> Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
