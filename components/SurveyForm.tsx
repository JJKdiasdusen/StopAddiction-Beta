
import React, { useState } from 'react';
import { SurveyData } from '../types';

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [data, setData] = useState<SurveyData>({
    class: '',
    gender: '',
    leisure: '',
    definition: '',
    healthAwareness: '',
    infoSource: '',
    lifestyleImportance: '',
    reasons: [],
    seenUsers: '',
    onlineAds: '',
    trustPerson: '',
    reactionToOffer: '',
    schoolPrevention: '',
    preventionSuggestions: '',
    madeMeThink: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCheckboxChange = (reason: string) => {
    setData(prev => ({
      ...prev,
      reasons: prev.reasons.includes(reason)
        ? prev.reasons.filter(r => r !== reason)
        : [...prev.reasons, reason]
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.class) newErrors.class = "Сыныбыңызды таңдаңыз";
    if (!data.gender) newErrors.gender = "Жынысыңызды көрсетіңіз";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(data);
    } else {
      const firstError = document.querySelector('.text-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const SectionHeader = ({ icon, title, subtitle }: { icon: string, title: string, subtitle: string }) => (
    <div className="mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50/50 rounded-r-xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-bold text-indigo-900 uppercase tracking-tight">{title}</h3>
      </div>
      <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
    </div>
  );

  const ProgressIndicator = () => {
    const totalFields = 15;
    const filledCount = Object.values(data).filter(val => {
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'string') return val.trim() !== '';
      return false;
    }).length;
    const progress = (filledCount / totalFields) * 100;
    
    return (
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 z-20 shadow-sm">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2 px-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
            БАРЫСЫ
          </span>
          <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="relative pb-10">
      <ProgressIndicator />
      
      <div className="p-6 md:p-12 space-y-16">
        {/* SECTION 1: PERSONAL */}
        <div className="space-y-8">
          <SectionHeader icon="👤" title="Жеке мәліметтер" subtitle="Сіз туралы қысқаша ақпарат" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Сыныбыңыз *</label>
              <div className="flex gap-3">
                {["9-сынып", "10-сынып", "11-сынып"].map(c => (
                  <button key={c} type="button" onClick={() => setData({ ...data, class: c })}
                    className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${data.class === c ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'}`}>
                    {c}
                  </button>
                ))}
              </div>
              {errors.class && <p className="text-red-500 text-xs mt-2 font-bold">{errors.class}</p>}
            </section>

            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Жынысыңыз *</label>
              <div className="flex gap-3">
                {["Ер", "Қыз"].map(g => (
                  <button key={g} type="button" onClick={() => setData({ ...data, gender: g })}
                    className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${data.gender === g ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'}`}>
                    {g}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-2 font-bold">{errors.gender}</p>}
            </section>
          </div>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Бос уақытыңызды қалай өткізесіз?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Спорт", "Ойын", "Кітап", "Достар"].map(opt => (
                <button key={opt} type="button" onClick={() => setData({ ...data, leisure: opt })}
                  className={`py-3 rounded-xl border-2 font-bold transition-all ${data.leisure === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION 2: AWARENESS */}
        <div className="space-y-8">
          <SectionHeader icon="🧠" title="Хабардарлық" subtitle="Білім деңгейін анықтау" />
          
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">«Нашақорлық» деген сөзді қалай түсінесіз?</label>
            <textarea
              value={data.definition}
              onChange={(e) => setData({ ...data, definition: e.target.value })}
              className="w-full p-5 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all min-h-[120px] bg-slate-50/50"
              placeholder="Өз ойыңызды ашық жазыңыз..."
            />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Зияны туралы білесіз бе?</label>
              <div className="flex flex-col gap-2">
                {["Толық білемін", "Естігенім бар", "Білмеймін"].map(opt => (
                  <button key={opt} type="button" onClick={() => setData({ ...data, healthAwareness: opt })}
                    className={`w-full py-3 px-4 text-left rounded-xl border-2 font-bold transition-all ${data.healthAwareness === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Ақпаратты қайдан аласыз?</label>
              <div className="flex flex-col gap-2">
                {["Мектеп", "Интернет", "Ата-ана", "Достар"].map(opt => (
                  <button key={opt} type="button" onClick={() => setData({ ...data, infoSource: opt })}
                    className={`w-full py-3 px-4 text-left rounded-xl border-2 font-bold transition-all ${data.infoSource === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Дұрыс өмір салты (ЗОЖ) қаншалықты маңызды?</label>
            <input type="range" min="1" max="5" step="1" 
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              onChange={(e) => setData({...data, lifestyleImportance: e.target.value})}
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 px-1 uppercase tracking-tighter">
              <span>Маңызды емес</span>
              <span>Өте маңызды</span>
            </div>
          </section>
        </div>

        {/* SECTION 3: ENVIRONMENT */}
        <div className="space-y-8">
          <SectionHeader icon="🏘️" title="Орта және Қауіп-қатерлер" subtitle="Айналаңыздағы жағдай" />
          
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Есірткіге әуестенудің негізгі себептері (бірнешеуін таңдаңыз)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Қызығушылық", "Достардың әсері", "Стресс", "Жалғыздық", "Жарнама"].map(r => (
                <label key={r} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${data.reasons.includes(r) ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-slate-100 bg-white hover:bg-slate-50'}`}>
                  <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    checked={data.reasons.includes(r)} onChange={() => handleCheckboxChange(r)} />
                  <span className="ml-3 font-bold text-slate-600 text-sm">{r}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Қолданатын адамдарды көрдіңіз бе?</label>
              <div className="flex gap-3">
                {["Иә", "Жоқ", "Жауап жоқ"].map(opt => (
                  <button key={opt} type="button" onClick={() => setData({ ...data, seenUsers: opt })}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${data.seenUsers === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Интернетте жарнама көрдіңіз бе?</label>
              <div className="flex gap-3">
                {["Иә", "Жоқ"].map(opt => (
                  <button key={opt} type="button" onClick={() => setData({ ...data, onlineAds: opt })}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${data.onlineAds === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Мәселе туындаса, кімге сенесіз?</label>
            <select 
              className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-500 bg-white font-bold text-slate-600"
              onChange={(e) => setData({...data, trustPerson: e.target.value})}
            >
              <option value="">Таңдаңыз...</option>
              <option value="Ата-ана">Ата-ана</option>
              <option value="Мұғалім">Мұғалім</option>
              <option value="Дос">Дос</option>
              <option value="Психолог">Психолог</option>
              <option value="Ешкім">Ешкімге сенбеймін</option>
            </select>
          </section>
        </div>

        {/* SECTION 4: ACTIONS */}
        <div className="space-y-8">
          <SectionHeader icon="🚀" title="Іс-қимыл және Болашақ" subtitle="Сіздің шешіміңіз" />
          
          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Есірткі ұсынылса, не істер едіңіз?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Бас тартамын", "Бірден кетемін", "Үлкендерге айтамын", "Ойланамын"].map(opt => (
                <button key={opt} type="button" onClick={() => setData({ ...data, reactionToOffer: opt })}
                  className={`py-4 rounded-xl border-2 font-bold transition-all text-sm ${data.reactionToOffer === opt ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 bg-white text-slate-500'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Мектептегі алдын алу жұмыстары?</label>
            <div className="flex gap-3">
              {["Жақсы", "Орташа", "Нашар"].map(opt => (
                <button key={opt} type="button" onClick={() => setData({ ...data, schoolPrevention: opt })}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${data.schoolPrevention === opt ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Алдын алу үшін не істеу керек? (Ұсыныс)</label>
            <textarea
              value={data.preventionSuggestions}
              onChange={(e) => setData({ ...data, preventionSuggestions: e.target.value })}
              className="w-full p-5 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all min-h-[100px] bg-slate-50/50"
              placeholder="Мектепте немесе қалада не жасауға болады?"
            />
          </section>

          <section>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Сауалнама сізге ой салды ма?</label>
            <div className="flex gap-4">
              {["Иә", "Жоқ", "Білмеймін"].map(opt => (
                <button key={opt} type="button" onClick={() => setData({ ...data, madeMeThink: opt })}
                  className={`flex-1 py-4 rounded-2xl border-2 font-black transition-all text-base ${data.madeMeThink === opt ? 'border-green-500 bg-green-50 text-green-700 shadow-md' : 'border-slate-100 bg-white text-slate-400'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="pt-10">
          <button type="submit"
            className="group relative w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-3xl shadow-2xl shadow-indigo-100 transition-all transform active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ЖАУАПТАРДЫ ЖІБЕРУ
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </form>
  );
};
