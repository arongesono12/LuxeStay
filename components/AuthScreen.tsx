
import React, { useState } from 'react';
import { AppScreen } from '../types';
import Logo from './Logo';

interface AuthScreenProps {
  mode: AppScreen.LOGIN | AppScreen.SIGNUP;
  onAuthSuccess: (email: string, name: string) => void;
  onToggleMode: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ mode, onAuthSuccess, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const isAdmin = email === "adminluxestay@info.com" && password === "Admin1234@";
      if (mode === AppScreen.LOGIN) {
        if (isAdmin) onAuthSuccess(email, "VIP Admin");
        else if (email.includes('@')) onAuthSuccess(email, email.split('@')[0]);
        else setError('Credenciales de membresía inválidas.');
      } else {
        onAuthSuccess(email, name || "Nuevo Huésped");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-10 bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(212,175,55,0.1)] border border-gold-100 relative z-10">
        <div className="flex flex-col items-center">
          <Logo className="w-32 h-32 mb-4" />
          <h2 className="text-center text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
            LuxeStay
          </h2>
          <div className="h-0.5 w-12 bg-gold-400 mt-2 mb-3"></div>
          <p className="text-center text-[10px] font-black tracking-[0.3em] text-gold-600 uppercase">
            {mode === AppScreen.LOGIN ? 'Acceso Exclusivo' : 'Inaugurar Membresía'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-[10px] p-4 rounded-2xl border border-red-100 text-center font-black uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {mode === AppScreen.SIGNUP && (
              <div className="group">
                <label className="block text-[9px] font-black text-gold-600 uppercase tracking-[0.2em] mb-2 ml-1">Su Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-6 py-4 bg-gold-50/30 border border-gold-100 rounded-2xl focus:ring-2 focus:ring-gold-400 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-300"
                  placeholder="Alexander Knight"
                />
              </div>
            )}
            <div>
              <label className="block text-[9px] font-black text-gold-600 uppercase tracking-[0.2em] mb-2 ml-1">E-mail de Membresía</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-6 py-4 bg-gold-50/30 border border-gold-100 rounded-2xl focus:ring-2 focus:ring-gold-400 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-300"
                placeholder="vip@luxestay.com"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black text-gold-600 uppercase tracking-[0.2em] mb-2 ml-1">Contraseña Privada</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-6 py-4 bg-gold-50/30 border border-gold-100 rounded-2xl focus:ring-2 focus:ring-gold-400 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-5 px-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-gold-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-70"
          >
            {isLoading ? (
              <i className="fas fa-crown fa-spin text-lg"></i>
            ) : (
              mode === AppScreen.LOGIN ? 'Entrar a la Suite' : 'Unirse al Círculo'
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={onToggleMode}
            className="text-[10px] font-black text-gray-400 hover:text-gold-600 transition-colors uppercase tracking-widest"
          >
            {mode === AppScreen.LOGIN 
              ? "¿No posee membresía? Solicítela" 
              : "¿Ya es miembro? Acceda aquí"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
