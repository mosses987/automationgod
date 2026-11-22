import { RouteObject, Navigate } from 'react-router';
import HomePage from './pages/index';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';
import ServicesPage from './pages/services';
import ResultsPage from './pages/results';
import BookPage from './pages/book';
import ContactPage from './pages/contact';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/book',
    element: <BookPage />,
  },
  {
    path: '/projects',
    element: <ResultsPage />,
  },
  {
    path: '/results',
    element: <Navigate to="/projects" replace />,
  },
  {
    id: 'airo-not-found',
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/services' | '/contact' | '/book' | '/projects';

export type Params = Record<string, string | undefined>;
