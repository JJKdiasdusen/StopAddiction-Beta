
import React from 'react';

interface IntroViewProps {
  onStart: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onStart }) => {
  return (
    <div className="p-8 md:p-16 text-center bg-gradient-to-b from-white to-indigo-50/30">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-indigo-50">
            <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
        Жасөспірімдер арасында <br/>
        <span className="text-indigo-600">нашақорлықтың алдын алу</span>
      </h2>
      
      <p className="text-slate-600 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
        Бұл сауалнама толығымен анонимді. Біз сіздің пікіріңізді бағалаймыз және болашағымызды бірге қауіпсіз ете алатынымызға сенеміз.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button
          onClick={onStart}
          className="group relative w-full sm:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-200 overflow-hidden"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700"></div>
          Сауалнаманы бастау
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
        {[
          { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: '100% Құпия' },
          { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '15 Сұрақ' },
          { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Жеке талдау' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-500">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
