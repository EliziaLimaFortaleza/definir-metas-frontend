import React from 'react';

const materiasMock = [
  { id: 1, nome: 'Português', descricao: 'Língua Portuguesa', ordem: 1 },
  { id: 2, nome: 'Matemática', descricao: 'Matemática Básica', ordem: 2 },
  { id: 3, nome: 'Direito Constitucional', descricao: 'Direito Constitucional', ordem: 3 },
];

const Materias: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Matérias</h1>
        <button className="btn-primary">+ Nova Matéria</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materiasMock.map(materia => (
          <div key={materia.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{materia.nome}</div>
            <div className="text-gray-600 text-sm">{materia.descricao}</div>
            <div className="text-gray-400 text-xs">Ordem: {materia.ordem}</div>
            <button className="btn-secondary mt-2 self-end">Ver Assuntos</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materias; 