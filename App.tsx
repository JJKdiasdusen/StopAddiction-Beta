
import React, { useState } from 'react';
import { SurveyForm } from './components/SurveyForm';
import { SuccessView } from './components/SuccessView';
import { IntroView } from './components/IntroView';
import { AdminDashboard } from './components/AdminDashboard';
import { Step, SurveyData, StoredResult } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<SurveyData | null>(null);

  const handleStart = () => {
    setCurrentStep('form');
  };

  const handleSubmit = (data: SurveyData) => {
    try {
      const newResult: StoredResult = {
        ...data,
        id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).substring(2),
        submittedAt: new Date().toLocaleString('kk-KZ'),
      };
      
      const existingResults = JSON.parse(localStorage.getItem('stop_addiction_results') || '[]');
      const updatedResults = [newResult, ...existingResults];
      localStorage.setItem('stop_addiction_results', JSON.stringify(updatedResults));

      setFormData(data);
      setCurrentStep('success');
    } catch (e) {
      console.error("Сақтау қатесі:", e);
      setFormData(data);
      setCurrentStep('success');
    }
  };

  const handleReset = () => {
    setFormData(null);
    setCurrentStep('intro');
  };

  const toggleAdmin = () => {
    setCurrentStep(prev => prev === 'admin' ? 'intro' : 'admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4 w-full">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-black text-indigo-900 tracking-tighter">
              StopAddiction
            </h1>
            <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Beta</span>
          </div>
          <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </header>

        <main className="bg-white shadow-2xl rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 w-full min-h-[400px]">
          {currentStep === 'intro' && <IntroView onStart={handleStart} />}
          {currentStep === 'form' && <SurveyForm onSubmit={handleSubmit} />}
          {currentStep === 'success' && formData && (
            <SuccessView formData={formData} onReset={handleReset} />
          )}
          {currentStep === 'admin' && <AdminDashboard onBack={handleReset} />}
        </main>

        <footer className="mt-12 text-center pb-8">
          <p className="text-slate-400 text-xs font-medium mb-4">
            &copy; {new Date().getFullYear()} Жасөспірімдерге арналған профилактикалық портал. Анонимді және қауіпсіз.
          </p>
          <button 
            onClick={toggleAdmin}
            className="text-[10px] font-black text-slate-300 hover:text-indigo-400 uppercase tracking-[0.2em] transition-all py-2 px-4 rounded-lg hover:bg-slate-100"
          >
            {currentStep === 'admin' ? 'Басты бетке қайту' : 'Админ панеліне өту'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
