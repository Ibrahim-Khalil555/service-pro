import { CheckCircle, Star } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  const scrollToServices = () => {
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
      filterBar.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[550px] w-full overflow-hidden lg:h-[650px]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center lg:text-left">
          {/* Trust Badge */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <div className="flex items-center gap-2 rounded-full bg-slate-900/40 px-4 py-2 backdrop-blur-md border border-white/10 shadow-2xl">
              <Star className="h-4 w-4 text-white fill-white" />
              <span className="text-xs font-bold text-white tracking-wide">Trusted by 50,000+ Happy Customers</span>
            </div>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Your Home Deserves <br />
            <span className="text-blue-500">The Best Care</span>
          </h1>
          
          <p className="mt-8 text-lg sm:text-xl text-slate-200 leading-relaxed max-w-lg mx-auto lg:mx-0">
            From car repairs to home cleaning, we connect you with 
            verified professionals who deliver exceptional service 
            every time.
          </p>

          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-5">
            <button 
              onClick={scrollToServices}
              className="group relative flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-10 py-5 text-base font-black text-white transition-all hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-600/30 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              Explore Services
              <CheckCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

