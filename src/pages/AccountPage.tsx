import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { logout } from '../auth/authSlice';
import { removeFromFavorites } from '../auth/favoritesSlice';
import FavoritesIcon from '../assets/FavoritesIcon.svg?react';
import UserIcon from '../assets/UserIcon.svg?react';
import CloseButton from '../assets/CloseButton.svg?react';
import MailIcon from '../assets/MailIcon.svg?react'
import { getInitials } from '../utils/getInitials';
import './AccountPage.css';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state: RootState) => state.favorites.list);
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeTab, setActiveTab] = useState<'favorites' | 'settings'>('favorites');

  const handleRemove = (movieId: string) => {
    dispatch(removeFromFavorites(movieId));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
      <main className="account-content">
        <h1 className="account-content-title">Мой аккаунт</h1>

        <nav className="tabs-nav">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <span className="icon-heart">
              <FavoritesIcon className="icon-heart" />
            </span>
            <span className='btn-title'>Избранные фильмы</span>
            <span className='btn-syb-title'>Избранное</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="icon-user">
              <UserIcon />
            </span>
            <span className='btn-title'>Настройка аккаунта</span>
            <span className='btn-syb-title'>Настройки</span>
          </button>
        </nav>

        {activeTab === 'favorites' ? (
          <div className="favorites-grid">
            {favorites.length === 0 ? (
              <p className="empty-state">У вас пока нет избранных фильмов.</p>
            ) : (
              favorites.map((fav) => (
                <div key={fav.id} className="favorites-card">
                  <img src={fav.poster} alt={fav.title} className="card-poster" />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(fav.id);
                    }}
                    aria-label={`Удалить ${fav.title}`}
                  >
                    <span className="close-btn">
                      <CloseButton />
                    </span>
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="settings-panel">
            {user ? (
              <>
                <div className="settings-panel-wrapper">
                  <div className="user-wrapper">
                    <div className="avatar-circle" aria-label={`Аватар пользователя: ${user.name} ${user.surname}`}>
                      {getInitials(user.name, user.surname)}
                    </div>
                    <p className='setting-info'>
                      Имя Фамилия
                      <strong className='setting-name'>{user.name} {user.surname}</strong>
                    </p>
                  </div>
                  <div className="mail-wrapper">
                    <div className="mail-circle">
                      <MailIcon className="mail-Icon-circle" />
                    </div>
                    <p className='setting-info'>
                      Электронная почта
                      <strong className='setting-name'>{user.email}</strong>
                    </p>
                  </div>
                </div>
                <button type="button" className="logout-btn" onClick={handleLogout}>
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <p>Загрузка данных пользователя...</p>
            )}
          </div>
        )}
      </main>
  );
};

export default AccountPage;
