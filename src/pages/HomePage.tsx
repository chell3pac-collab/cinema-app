import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchRandomHeroMovie } from '../movies/moviesSlice';
import HeroSection from '../components/HeroSection';
import { TopMovies } from '../components/TopMovies';

interface HomePageProps {
  onOpenAuth: () => void;
  onAuthSuccess: () => void;
  onRequestAddAfterAuth: (movieId: number) => void;
}

export const HomePage = ({
  onOpenAuth,
  onAuthSuccess,
  onRequestAddAfterAuth,
}: HomePageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRandomHeroMovie());
  }, [dispatch]);

  return (
    <main className='home-page'>
      <HeroSection onRequestAddAfterAuth={onRequestAddAfterAuth} />
      <TopMovies />
    </main>
  );
};

export default HomePage;



