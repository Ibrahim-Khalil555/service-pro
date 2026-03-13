import { Wrench, Menu, X, Home as HomeIcon, LayoutGrid, Info, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export default function Header({ onOpenAuth }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Services', path: '/services', icon: LayoutGrid },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];


  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer relative z-[60]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">ServicePro</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${isActive(link.path)
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              {link.name === 'Home' && (
                <link.icon className={`h-4 w-4 ${isActive(link.path) ? 'text-white' : 'text-slate-400'}`} />
              )}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>


        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => onOpenAuth('login')}
            className="hidden md:block rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 cursor-pointer"
          >
            Login
          </button>
          <Link
            to="/admin"
            className="hidden md:block rounded-full bg-red-400 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-200 active:scale-95 cursor-pointer"
          >
            Admin
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-500 hover:text-blue-600 md:hidden cursor-pointer relative z-[60]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
            onClick={toggleMenu}
          />

          {/* Drawer Content */}
          <nav className="absolute top-4 right-4 left-4 rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out transform">
            {/* Drawer Header */}
            <div className="flex items-center justify-end p-6">
              <button
                onClick={toggleMenu}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="border-t border-slate-100" />

            {/* Links */}
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-base font-bold transition-all duration-300 ${isActive(link.path)
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 text-lg'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  onClick={toggleMenu}
                >
                  {link.name === 'Home' && (
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isActive(link.path) ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400'
                      }`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                  )}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>



            {/* Bottom Actions */}
            <div className="p-4 pt-2 pb-6 flex gap-3">
              <button
                onClick={() => { onOpenAuth('login'); toggleMenu(); }}
                className="flex-1 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-[0.98] cursor-pointer"
              >
                Login
              </button>
              <Link
                to="/admin"
                onClick={toggleMenu}
                className="flex-1 rounded-xl bg-red-400 py-3.5 text-sm font-bold text-white text-center shadow-lg shadow-red-200 transition-all active:scale-[0.98] cursor-pointer"
              >
                Admin
              </Link>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}


