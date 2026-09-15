import React from 'react';
import './LoginForm.css';
import MailIcon from '../assets/MailIcon.svg?react';
import PasswordIcon from '../assets/PasswordIcon.svg?react';

interface LoginFormProps {
    email: string;
    password: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    errors: { email?: string; password?: string };
    onGoToRegister: () => void;
}

export const LoginForm = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    errors,
    onGoToRegister,
}: LoginFormProps) => {
    return (
        <form onSubmit={onSubmit} className="auth-form">
            <div className='form-group-wrapper'>
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
                            type="password"
                            placeholder="Пароль"
                            className={`auth-input ${errors.password ? 'input-error' : ''}`}
                            value={password}
                            onChange={onPasswordChange}
                            required
                            autoComplete="current-password"
                        />
                        <PasswordIcon className='auth-input-icon' />
                    </div>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
            </div>
            <button 
            type="submit" 
            className="auth-btn"
            aria-label='Кнопка войти'
            >
                Войти
            </button>
            <button 
            type='button' 
            className='auth-toggle-link' 
            onClick={onGoToRegister} 
            aria-label="Перейти к регистрации" >
                Регистрация
            </button>
        </form>
    );
};
;
