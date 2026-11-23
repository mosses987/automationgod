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
import ServiceDetailPage from './pages/service-detail';
import PrivacyPage from './pages/privacy';

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
    path: '/services/website-design',
    element: <ServiceDetailPage slug="website-design" />,
  },
  {
    path: '/services/custom-software',
    element: <ServiceDetailPage slug="custom-software" />,
  },
  {
    path: '/services/workflow-automation',
    element: <ServiceDetailPage slug="workflow-automation" />,
  },
  {
    path: '/services/ai-assistants',
    element: <ServiceDetailPage slug="ai-assistants" />,
  },
  {
    path: '/services/booking-and-ordering',
    element: <ServiceDetailPage slug="booking-and-ordering" />,
  },
  {
    path: '/services/crm-and-follow-up',
    element: <ServiceDetailPage slug="crm-and-follow-up" />,
  },
  {
    path: '/services/automated-reviews',
    element: <ServiceDetailPage slug="automated-reviews" />,
  },
  {
    path: '/services/website-care-plans',
    element: <ServiceDetailPage slug="website-care-plans" />,
  },
  {
    path: '/services/seo',
    element: <ServiceDetailPage slug="seo" />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
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
export type Path = '/' | '/services' | `/services/${string}` | '/contact' | '/book' | '/projects' | '/privacy';

export type Params = Record<string, string | undefined>;
