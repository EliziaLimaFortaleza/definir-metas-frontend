import React from 'react';

const concursosMock = [
  { id: 1, nome: 'Concurso Polícia Federal', cargo: 'Agente', created_at: '2024-05-01' },
  { id: 2, nome: 'TRF 3ª Região', cargo: 'Analista Judiciário', created_at: '2024-04-15' },
];

const Concursos: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Concursos</h1>
        <button className="btn-primary">+ Novo Concurso</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concursosMock.map(concurso => (
          <div key={concurso.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{concurso.nome}</div>
            <div className="text-gray-600 text-sm">Cargo: <span className="font-medium">{concurso.cargo}</span></div>
            <div className="text-gray-400 text-xs">Cadastrado em {concurso.created_at}</div>
            <button className="btn-secondary mt-2 self-end">Ver Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Concursos; 