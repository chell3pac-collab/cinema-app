import React from 'react';
import './SuccessScreen.css';


interface SuccessScreenProps {
  onBackToLogin: () => void;
}

export const SuccessScreen = ({ onBackToLogin }: SuccessScreenProps) => (
  <div className="success-screen-container">
    <h3 className='success-screen-title'>Регистрация завершена</h3>
    <p className='success-screen-text'>Используйте вашу электронную почту для входа</p>
    <button 
      type="button" 
      className="success-screen-btn" 
      onClick={onBackToLogin}
    >
      Войти
    </button>
  </div>
);
