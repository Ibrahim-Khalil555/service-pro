import { X, Mail, Lock, User, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  initialMode: 'login' | 'register';
}

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  icon: LucideIcon;
  required?: boolean;
}

function InputField({ label, type, placeholder, icon: Icon, required = true }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
      <div className="group relative transition-all duration-300">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        </div>
        <input 
          type={type} 
          required={required}
          className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all duration-300 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default function AuthModal({ onClose, initialMode }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 cursor-pointer z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2.5 text-slate-500 font-medium">
              {mode === 'login' 
                ? 'Access your dashboard and manage your bookings.' 
                : 'Join our community of 50,000+ happy customers.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert(`${mode === 'login' ? 'Login' : 'Registration'} successful (Mock)`); onClose(); }}>
            {mode === 'register' && (
              <InputField 
                label="Full Name" 
                type="text" 
                placeholder="Enter your name" 
                icon={User} 
              />
            )}
            
            <InputField 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              icon={Mail} 
            />

            <InputField 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
            />

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest cursor-pointer">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="mt-4 w-full rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              {mode === 'login' ? 'SIGN IN' : 'GET STARTED'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            {mode === 'login' ? (
              <p className="text-sm font-medium text-slate-500">
                New to ServicePro?{' '}
                <button 
                  onClick={() => setMode('register')}
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p className="text-sm font-medium text-slate-500">
                Already have an account?{' '}
                <button 
                  onClick={() => setMode('login')}
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

