import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export default function ToastContainer() {
  const { toasts } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'error': return <AlertCircle size={18} />;
      case 'info': return <Info size={18} />;
      default: return <CheckCircle size={18} />;
    }
  };

  return (
    <div className="toast-container" role="alert" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type || 'success'} glass-strong`}>
          <div className="toast__icon">{getIcon(toast.type)}</div>
          <span className="toast__message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
