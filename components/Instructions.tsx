
import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
      <h2 className="text-blue-800 font-bold text-lg mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        Como realizar a verificação:
      </h2>
      <ul className="space-y-3 text-blue-900 text-sm">
        <li className="flex items-start">
          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
          Utilize o gabarito oficial enviado para sua unidade.
        </li>
        <li className="flex items-start">
          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
          Posicione cada uma das 5 lentes no seu lensômetro.
        </li>
        <li className="flex items-start">
          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
          Digite abaixo o valor da dioptria encontrado para cada lente.
        </li>
        <li className="flex items-start">
          <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
          Clique em "Gerar Verificação" para validar seu equipamento.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
