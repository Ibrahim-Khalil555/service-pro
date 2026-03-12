import { Wrench, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/40 transition-transform group-hover:scale-110">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">ServicePro</span>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              Transforming home and automotive care with 
              verified professionals and seamless technology.
            </p>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Join Our Newsletter</h4>
              <div className="relative max-w-xs">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button className="absolute right-2 top-2 rounded-xl bg-blue-600 p-2.5 text-white hover:bg-blue-500 transition-all active:scale-95 cursor-pointer">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Navigation</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-sm hover:text-blue-500 transition-colors">Home</Link></li>
                <li><Link to="/services" className="text-sm hover:text-blue-500 transition-colors">Services</Link></li>
                <li><Link to="/about" className="text-sm hover:text-blue-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-sm hover:text-blue-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Categories</h3>
              <ul className="space-y-4">
                <li><button className="text-sm hover:text-blue-500 transition-colors cursor-pointer">Automotive</button></li>
                <li><button className="text-sm hover:text-blue-500 transition-colors cursor-pointer">Home Cleaning</button></li>
                <li><button className="text-sm hover:text-blue-500 transition-colors cursor-pointer">Plumbing</button></li>
                <li><button className="text-sm hover:text-blue-500 transition-colors cursor-pointer">Maintenance</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Get In Touch</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-blue-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm">hello@servicepro.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-blue-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">+1 (555) 000-0000</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-blue-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm leading-relaxed">123 Service St, Tech City, ST 12345</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-xs font-semibold tracking-wide">
              © {new Date().getFullYear()} SERVICEPRO INC.
            </p>
            <div className="flex gap-6 uppercase tracking-widest text-[10px] font-black">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

