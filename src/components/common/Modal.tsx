// src/components/common/Modal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Título opcional para el encabezado del modal
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Tamaños opcionales
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md' }) => {
  // Efecto para cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Evitar scroll del body cuando el modal está abierto
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md'; // Default
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl md:max-w-2xl lg:max-w-3xl'; // Más responsivo
      default: return 'max-w-md';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose} // Cerrar al hacer clic en el backdrop
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          />

          {/* Contenido del Modal */}
          <motion.div
            key="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-0 m-auto ${getSizeClass()} w-full h-fit max-h-[90vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {/* Encabezado del Modal (Opcional) */}
            {(title || Boolean(onClose)) && (
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
                {title && (
                  <h3 id="modal-title" className="text-xl font-semibold text-fair-primary">
                    {title}
                  </h3>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 rounded-full focus:outline-none focus:ring-2 focus:ring-fair-secondary"
                  aria-label="Cerrar modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            )}

            {/* Cuerpo del Modal */}
            <div className="p-4 md:p-6 overflow-y-auto flex-grow">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;