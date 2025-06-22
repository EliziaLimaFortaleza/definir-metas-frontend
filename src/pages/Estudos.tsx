import React from 'react';

const estudosMock = [
  { id: 1, data: '2024-06-01', materia: 'Português', assunto: 'Gramática', duracao: 60, observacoes: 'Revisão de regras' },
  { id: 2, data: '2024-06-02', materia: 'Matemática', assunto: 'Álgebra', duracao: 45, observacoes: 'Exercícios resolvidos' },
];

const Estudos: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Registro de Estudos</h1>
        <button className="btn-primary">+ Novo Registro</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {estudosMock.map(estudo => (
          <div key={estudo.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{estudo.materia} - {estudo.assunto}</div>
            <div className="text-gray-600 text-sm">{estudo.data} | {estudo.duracao} min</div>
            <div className="text-gray-500 text-xs">{estudo.observacoes}</div>
            <button className="btn-secondary mt-2 self-end">Ver Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estudos; 