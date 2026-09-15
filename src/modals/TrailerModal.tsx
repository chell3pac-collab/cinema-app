import React from 'react';
import CloseIcon from '../assets/close-icon.svg?react';
import './TrailerModal.css'

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string; 
}

export const TrailerModal = ({ isOpen, onClose, videoId }: TrailerModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="trailer-modal-overlay" onClick={onClose}>
      <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button 
          className="trailer-close-btn" 
          onClick={onClose}
          aria-label="Закрыть трейлер"
        >
          <CloseIcon className='trailer-close-icon'/>
        </button>

        <div className="trailer-video-wrapper">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              title="Трейлер"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="loader">Загрузка...</div>
          )}
        </div>
      </div>
    </div>
  );
};

