import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';

const HomePage = lazy(() => import('./Views/homePage/HomePage'));
const Movies = lazy(() => import('Views/movies'));
const MovieDetailsPage = lazy(() => import('Views/MovieDetailsPage'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="movies"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Movies />
            </Suspense>
          }
        />
        <Route
          path="movies/:movieId/*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetailsPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};
