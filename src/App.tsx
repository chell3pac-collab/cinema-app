import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, logout } from './auth/authSlice';
import type { RootState } from './store/store';
import { toggleFavorite } from './movies/moviesSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { GenresPage } from './pages/GenresPage';
import { GenreListPage } from './pages/GenreListPage'
import { MoviePage } from './pages/MoviePage';
import SearchPage from './pages/SearchPage';
import AccountPage from './pages/AccountPage';
import { AuthModal } from './modals/AuthModal';
import { useState } from 'react';
import { MainLayout } from './components/MainLayout'



function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFullName = user ? `${user.name} ${user.surname}` : 'Профиль';
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingFavoriteId, setPendingFavoriteId] = useState<number | null>(null);
  const handleAuthSuccess = (userData: { user: any; token: string }) => {
    console.log('[App] handleAuthSuccess вызван');
    console.log('[App] pendingFavoriteId перед входом:', pendingFavoriteId);

    dispatch(loginSuccess(userData));

    if (pendingFavoriteId !== null) {
      console.log('[App] Отправляем toggleFavorite для ID:', pendingFavoriteId);
      dispatch(toggleFavorite(pendingFavoriteId));
      setPendingFavoriteId(null);
    } else {
      console.log('[App] pendingFavoriteId === null — добавлять нечего');
    }

    setIsAuthModalOpen(false);
    navigate('/account');
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleRequestAddAfterAuth = (movieId: number) => {
    setPendingFavoriteId(movieId);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userFullName={userFullName}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />


      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <HomePage
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onAuthSuccess={handleAuthSuccess}
                onRequestAddAfterAuth={handleRequestAddAfterAuth}
              />
            }
          />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:genre" element={<GenreListPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route
            path="/account"
            element={
              isAuthenticated ? (
                <AccountPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>
      </Routes>


      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default App;

