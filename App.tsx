
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Instructions from './components/Instructions';
import { DiopterInput, CalibrationResult } from './types';
import { validateDiopter, generateUniqueCode } from './utils/helpers';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<DiopterInput[]>([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
  ]);

  const [result, setResult] = useState<CalibrationResult>({ status: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (id: number, val: string) => {
    setInputs(prev => prev.map(input => 
      input.id === id ? { ...input, value: val } : input
    ));
    
    if (result.status !== 'idle') {
      setResult({ status: 'idle' });
    }
  };

  const generateErrorCode = (lensId: number) => {
    const random = Math.floor(100 + Math.random() * 900); // 3 números aleatórios
    return `#${random}${lensId}`;
  };

  const handleReset = () => {
    setInputs([
      { id: 1, value: '' },
      { id: 2, value: '' },
      { id: 3, value: '' },
      { id: 4, value: '' },
      { id: 5, value: '' },
    ]);
    setResult({ status: 'idle' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerify = useCallback(() => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const failingLenses = inputs.filter(input => !validateDiopter(input.value));
      
      if (failingLenses.length === 0) {
        setResult({
          status: 'success',
          code: generateUniqueCode()
        });
      } else {
        const errorCodes = failingLenses.map(lens => generateErrorCode(lens.id));
        setResult({
          status: 'failure',
          errorCodes
        });
      }
      setIsSubmitting(false);
      
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 600);
  }, [inputs]);

  const handleSendSuccessToWhatsApp = () => {
    if (!result.code) return;
    const phoneNumber = "5551995826349";
    const message = `Olá! Gostaria de solicitar meu certificado de calibração. Meu código de verificação é: ${result.code}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendErrorToWhatsApp = () => {
    if (!result.errorCodes) return;
    const phoneNumber = "5551995826349";
    const codes = result.errorCodes.join(", ");
    const message = `Olá, não consegui validar minha calibração. Os códigos de erro gerados foram: ${codes}. Preciso de auxílio na verificação do meu lensômetro.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const isFormIncomplete = inputs.some(i => i.value.trim() === '');

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <Header />
      
      <main className="max-w-xl mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Calibração de Lensômetro</h1>
          <p className="text-gray-600">Verificação técnica remota para garantia de qualidade.</p>
        </div>

        <Instructions />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="space-y-6">
            {inputs.map((input) => (
              <div key={input.id} className="group">
                <label htmlFor={`diop-${input.id}`} className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  Lente Gabarito #{input.id}
                </label>
                <div className="relative">
                  <input
                    id={`diop-${input.id}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="Ex: 0,25 ou 0.50"
                    value={input.value}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className="block w-full px-4 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-xl font-semibold text-gray-800"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none font-bold text-gray-400">
                    Dpt
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={handleVerify}
                disabled={isFormIncomplete || isSubmitting}
                className={`w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transform transition-all active:scale-95 flex items-center justify-center uppercase tracking-wide ${
                  isFormIncomplete || isSubmitting
                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validando...
                  </>
                ) : 'Gerar Verificação de Calibração'}
              </button>
            </div>
          </div>
        </div>

        {/* Área de Resultados */}
        <div className="mt-10">
          {result.status === 'success' && (
            <div className="bg-white border-4 border-green-500 rounded-3xl p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-green-700 mb-4">PARABÉNS!</h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                Seu lensômetro está <span className="text-green-600 font-bold">calibrado</span> e garantindo a qualidade do produto entregue para seu cliente.
              </p>
              <div className="bg-slate-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 relative group overflow-hidden mb-8">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H7a2 2 0 00-2 2v6H3a2 2 0 01-2-2V7a2 2 0 012-2h2V5z" /></svg>
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Código de Certificação</p>
                <p className="text-3xl font-mono font-black text-blue-700 select-all tracking-tighter">{result.code}</p>
              </div>
              
              <button
                onClick={handleSendSuccessToWhatsApp}
                className="w-full py-5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-lg shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-3 mb-4"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.