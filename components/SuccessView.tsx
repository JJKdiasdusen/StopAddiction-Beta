
import React, { useEffect, useState } from 'react';
import { SurveyData } from '../types';
import { getAIInsights } from '../services/gemini';

interface SuccessViewProps {
  formData: SurveyData;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ formData, onReset }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInsight = async () => {
      const result = await getAIInsights(formData);
      setInsight(result);
      setLoading(false);
    };
    fetchInsight();
  }, [formData]);

  return (
    <div className="p-8 md:p-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 scale-150"></div>
          <div className="relative bg-green-500 p-6 rounded-[2.5rem] shadow-2xl shadow-green-100">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
      
      <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Керемет!</h2>
      <p className="text-slate-500 font-bold mb-12 text-lg">Сауалнама сәтті аяқталды.</p>

      <div className="group relative bg-white border-2 border-indigo-50 rounded-[2rem] p-8 mb-10 text-left shadow-xl shadow-indigo-100/50 hover:shadow-2xl transition-all duration-500">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          <svg className="w-32 h-32 text-indigo-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white text-xs font-black italic">AI</span>
          </div>
          <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest">Психологтың жеке талдауы</h3>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded-full w-[90%] animate-pulse delay-75"></div>
            <div className="h-4 bg-slate-100 rounded-full w-[80%] animate-pulse delay-150"></div>
          </div>
        ) : (
          <p className="text-slate-800 text-lg leading-relaxed font-semibold italic">
            "{insight}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Көмек қажет болса</h4>
          <p className="text-2xl font-black text-indigo-900 tracking-tighter">111</p>
          <p className="text-xs text-slate-500 font-bold mt-1 uppercase">Тәулік бойы / Тегін</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Сенім телефоны</h4>
          <p className="text-2xl font-black text-indigo-900 tracking-tighter">150</p>
          <p className="text-xs text-slate-500 font-bold mt-1 uppercase">Құпия кеңес</p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 font-bold rounded-2xl transition-all shadow-sm"
      >
        Басты бетке қайту
      </button>
    </div>
  );
};
