import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  };

  const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
      // Add event listener to handle "Escape" key press to close the modal
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener('keydown', handleEscapeKey);
      } else {
        document.removeEventListener('keydown', handleEscapeKey);
      }
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default DeleteModal;