import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import CheckoutPage from './pages/CheckoutPage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

import AdminPanel from './pages/AdminPanel';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
      {/* <Header onOpenAuth={openAuth} /> */}
      {!isAdminPage && <Header onOpenAuth={openAuth} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>


      <Footer />

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />
      )}
    </div>
  );
}

export default App;

