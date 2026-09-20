import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'page_view',
      page_title: document.title,
      page_path: location.pathname,
    });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTracker />

      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />

        <Route
          path="/services"
          element={<Layout><Services /></Layout>}
        />

        <Route
          path="/services/:slug"
          element={<Layout><ServiceDetail /></Layout>}
        />

        <Route
          path="/about"
          element={<Layout><About /></Layout>}
        />

        <Route
          path="/contact"
          element={<Layout><Contact /></Layout>}
        />
      </Routes>
    </BrowserRouter>
  );
}