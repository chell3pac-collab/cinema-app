import { useEffect, useState } from 'react';
import CloseButton from '../assets/CloseButton.svg?react'
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { SuccessScreen } from './SuccessScreen';
import { validateRegistrationForm, validateLoginForm } from './authValidation';
import './AuthModal.css';

type ModalStatus = 'login' | 'register' | 'success';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (userData: { user: any; token: string }) => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [status, setStatus] = useState<ModalStatus>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registeredName, setRegisteredName] = useState('');
  const [registeredSurname, setRegisteredSurname] = useState('');

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  useEffect(() => {
    if (!isOpen) {
      setStatus('login');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setErrors({});
    }
  }, [isOpen]);

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateLoginForm(email, password);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const userData = {
      user: {
        email,
        name: registeredName || 'Пользователь',
        surname: registeredSurname || '',
      },
      token: 'mock-token-123',
    };

    onSuccess?.({
      user: userData.user,
      token: userData.token,
    });

    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateRegistrationForm(firstName, lastName, email, password, confirmPassword);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setRegisteredName(firstName);
    setRegisteredSurname(lastName);
    setStatus('success');
  };

  const handleBackToLogin = () => {
    setStatus('login');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Закрыть">
          <CloseButton />
        </button>

        <div className="auth-logo">
          <img className="auth-logo-icon" src="/login-icon.svg" alt="Cinema App" />
        </div>

        {status === 'login' && (
          <LoginForm
            email={email}
            password={password}
            onEmailChange={(e) => { const val = e.target.value.trim(); setEmail(val); clearError('email'); }}
            onPasswordChange={(e) => { setPassword(e.target.value); clearError('password'); }}
            onSubmit={handleLogin}
            errors={{ email: errors.email, password: errors.password }}
            onGoToRegister={() => setStatus('register')}
          />
        )}

        {status === 'register' && (
          <RegistrationForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onFirstNameChange={(e) => { setFirstName(e.target.value); clearError('firstName'); }}
            onLastNameChange={(e) => { setLastName(e.target.value); clearError('lastName'); }}
            onEmailChange={(e) => { const val = e.target.value.trim(); setEmail(val); clearError('email'); }}
            onPasswordChange={(e) => { setPassword(e.target.value); clearError('password'); }}
            onConfirmPasswordChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
            onSubmit={handleRegister}
            onBackToLogin={handleBackToLogin}
            errors={{
              firstName: errors.firstName,
              lastName: errors.lastName,
              email: errors.email,
              password: errors.password,
              confirmPassword: errors.confirmPassword,
            }}
          />
        )}

        {status === 'success' && (
          <SuccessScreen onBackToLogin={handleBackToLogin} />
        )}
      </div>
    </div>
  );
};
