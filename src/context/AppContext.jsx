import React, { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';
import { products as initialProducts } from '../data/products';

const AppContext = createContext(null);

// ── Action Types ──
const ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_ROLE: 'SET_ROLE',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QTY: 'UPDATE_CART_QTY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_WISHLIST: 'TOGGLE_WISHLIST',
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  ADD_PRODUCT: 'ADD_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  SET_PRODUCTS: 'SET_PRODUCTS',
};

// ── Local Storage Helpers ──
function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

// ── Initial State ──
const initialState = {
  products: loadFromStorage('nxv_products', initialProducts),
  cart: loadFromStorage('nxv_cart', []),
  wishlist: loadFromStorage('nxv_wishlist', []),
  theme: loadFromStorage('nxv_theme', 'dark'),
  role: 'user',
  toasts: [],
};

// ── Reducer ──
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };

    case ACTIONS.SET_ROLE:
      return { ...state, role: action.payload };

    case ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + quantity } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...product, qty: quantity }] };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case ACTIONS.UPDATE_CART_QTY: {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return { ...state, cart: state.cart.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === id ? { ...item, qty } : item)),
      };
    }

    case ACTIONS.CLEAR_CART:
      return { ...state, cart: [] };

    case ACTIONS.TOGGLE_WISHLIST: {
      const exists = state.wishlist.find((item) => item.id === action.payload.id);
      if (exists) {
        return { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload.id) };
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }

    case ACTIONS.ADD_TOAST:
      return { ...state, toasts: [...state.toasts, action.payload] };

    case ACTIONS.REMOVE_TOAST:
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };

    case ACTIONS.ADD_PRODUCT:
      return { ...state, products: [action.payload, ...state.products] };

    case ACTIONS.DELETE_PRODUCT:
      return { ...state, products: state.products.filter((p) => p.id !== action.payload) };

    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
}

// ── Provider ──
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    saveToStorage('nxv_cart', state.cart);
  }, [state.cart]);

  useEffect(() => {
    saveToStorage('nxv_wishlist', state.wishlist);
  }, [state.wishlist]);

  useEffect(() => {
    saveToStorage('nxv_products', state.products);
  }, [state.products]);

  useEffect(() => {
    saveToStorage('nxv_theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // ── Toast System ──
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    dispatch({ type: ACTIONS.ADD_TOAST, payload: { id, message, type } });
    setTimeout(() => {
      dispatch({ type: ACTIONS.REMOVE_TOAST, payload: id });
    }, 3500);
  }, []);

  // ── Actions ──
  const toggleTheme = useCallback(() => {
    dispatch({
      type: ACTIONS.SET_THEME,
      payload: state.theme === 'dark' ? 'light' : 'dark',
    });
  }, [state.theme]);

  const setRole = useCallback((role) => {
    dispatch({ type: ACTIONS.SET_ROLE, payload: role });
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { product, quantity } });
      showToast(`${product.name} added to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (productId) => {
      dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
      showToast('Item removed from cart', 'info');
    },
    [showToast]
  );

  const updateCartQty = useCallback((id, qty) => {
    dispatch({ type: ACTIONS.UPDATE_CART_QTY, payload: { id, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    showToast('Cart cleared', 'info');
  }, [showToast]);

  const toggleWishlist = useCallback(
    (product) => {
      const exists = state.wishlist.find((item) => item.id === product.id);
      dispatch({ type: ACTIONS.TOGGLE_WISHLIST, payload: product });
      if (exists) {
        showToast('Removed from wishlist', 'info');
      } else {
        showToast(`${product.name} added to wishlist`, 'success');
      }
    },
    [state.wishlist, showToast]
  );

  const addProduct = useCallback(
    (product) => {
      dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product });
      showToast('Product added to catalog');
    },
    [showToast]
  );

  const deleteProduct = useCallback(
    (id) => {
      dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: id });
      showToast('Product removed from catalog', 'error');
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId) => {
      return state.wishlist.some((item) => item.id === productId);
    },
    [state.wishlist]
  );

  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    ...state,
    cartTotal,
    cartItemCount,
    quickViewProduct,
    setQuickViewProduct,
    toggleTheme,
    setRole,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    addProduct,
    deleteProduct,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
