import React from 'react';
import './RegistrationForm.css';
import MailIcon from '../assets/MailIcon.svg?react';
import PasswordIcon from '../assets/PasswordIcon.svg?react';
import UserIcon from '../assets/UserIcon.svg?react';

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegistrationFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToLogin: () => void;
  errors: Errors;
}

export const RegistrationForm = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBackToLogin,
  errors,
}: RegistrationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h1 className='auth-form-title'>Регистрация</h1>
      <div className='auth-form-wrapper'>
        <div className="form-group">
          <div className='form-group-input'>
            <input
              type="email"
              placeholder="Электронная почта"
              className={`auth-input ${errors.email ? 'input-error' : ''}`}
              value={email}
              onChange={onEmailChange}
              required
              autoComplete="username"
            />
            <MailIcon className='auth-input-icon' />
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <div className='form-group-input'>
            <input
              type="text"
              placeholder="Имя"
              className={`auth-input ${errors.firstName ? 'input-error' : ''}`}
              value={firstName}
              onChange={onFirstNameChange}
            />
            <UserIcon className='auth-input-icon' />
          </div>
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <div className='form-group-input'>
            <input
              type="text"
              placeholder="Фамилия"
              className={`auth-input ${errors.lastName ? 'input-error' : ''}`}
              value={lastName}
              onChange={onLastNameChange}
            />
            <UserIcon className='auth-input-icon' />
          </div>
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <div className='form-group-input'>
            <input
              type="password"
              placeholder="Пароль"
              className={`auth-input ${errors.password ? 'input-error' : ''}`}
              value={password}
              onChange={onPasswordChange}
              required
            />
            <PasswordIcon className='auth-input-icon' />
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-group">
          <div className='form-group-input'>
            <input
              type="password"
              placeholder="Подтвердите пароль"
              className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
            />
            <PasswordIcon className='auth-input-icon' />
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
      </div>
      <button 
      type="submit" 
      className="auth-btn"
      aria-label='Создать аккаунт'
      >
        Создать аккаунт
      </button>
      <button 
      type='button' 
      className='auth-toggle-link' 
      onClick={onBackToLogin}
      aria-label='Перейти к форме входа'
      >
        У меня есть пароль
      </button>
    </form>
  );
};


