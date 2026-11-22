import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from 'react-router';

import HomepageSameAsJsonLd from '@/components/HomepageSameAsJsonLd';
import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';
import { CartProvider } from '@/contexts/cart-context';

interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <CartProvider>
      <Website>
        <Helmet>
          <title>Waterloo Web Design, SEO &amp; Custom Software | Automation God</title>
          <meta name="description" content="Websites, SEO, custom software, automated reviews and AI automation from one Waterloo, Ontario partner." />
        </Helmet>
        <HomepageSameAsJsonLd />
        <ScrollRestoration />
        <Header />
        {children}
        <Footer />
      </Website>
    </CartProvider>
  );
}
