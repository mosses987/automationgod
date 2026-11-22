import { RouteObject } from 'react-router';
import { lazy } from 'react';
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
import ProductsPage from './pages/Products';
import CartPage from './pages/cart';
import CheckoutSuccess from './pages/checkout/success';
import CheckoutCancel from './pages/checkout/cancel';

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
    path: '/results',
    element: <ResultsPage />,
  },
  {
    path: '/tools',
    element: <ProductsPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout/success',
    element: <CheckoutSuccess />,
  },
  {
    path: '/checkout/cancel',
    element: <CheckoutCancel />,
  },
  {
    id: 'airo-not-found',
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/services' | '/contact' | '/book' | '/results' | '/tools' | '/cart' | '/checkout/success' | '/checkout/cancel';

export type Params = Record<string, string | undefined>;
