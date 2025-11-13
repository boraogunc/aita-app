
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-[#1e1b2e] rounded-2xl p-8 max-w-sm mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-8">{message}</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 font-semibold transition">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 font-semibold transition">
            Yes, Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
