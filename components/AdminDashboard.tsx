
import React, { useState, useEffect } from 'react';
import { StoredResult } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [results, setResults] = useState<StoredResult[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('stop_addiction_results') || '[]');
    setResults(data);
  }, []);

  const clearData = () => {
    if (window.confirm('Барлық деректерді өшіруге сенімдісіз бе?')) {
      localStorage.removeItem('stop_addiction_results');
      setResults([]);
    }
  };

  return (
    <div className="p-6 md:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Сауалнама Нәтижелері</h2>
          <p className="text-slate-500 text-sm font-medium">Жиналған барлық жауаптар тізімі</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={clearData}
            className="flex-1 md:flex-none px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
          >
            Тазарту
          </button>
          <button 
            onClick={onBack}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Жабу
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold">Әзірге ешқандай жауап түскен жоқ.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Уақыты</th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Сынып</th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Жынысы</th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ЗОЖ маңызы</th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Сенім</th>
                <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Шешімі</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="text-xs font-bold text-slate-900">{res.submittedAt.split(', ')[0]}</div>
                    <div className="text-[10px] text-slate-400">{res.submittedAt.split(', ')[1]}</div>
                  </td>
                  <td className="p-4 text-xs font-bold text-indigo-600">{res.class}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${res.gender === 'Ер' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                      {res.gender}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= parseInt(res.lifestyleImportance || '0') ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-slate-600">{res.trustPerson || '-'}</td>
                  <td className="p-4">
                    <span className="text-xs font-bold text-slate-900 truncate block max-w-[120px]">
                      {res.reactionToOffer}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 p-6 bg-indigo-900 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Жалпы статистика</p>
            <h4 className="text-xl font-black">{results.length} қатысушы жауап берді</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
