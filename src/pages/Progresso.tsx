import React from 'react';

const progressoGeral = { percentual: 60, tempo: 120 };
const materias = [
  { id: 1, nome: 'Português', percentual: 80, tempo: 40 },
  { id: 2, nome: 'Matemática', percentual: 50, tempo: 30 },
];
const assuntos = [
  { id: 1, nome: 'Gramática', materia: 'Português', percentual: 90, tempo: 20 },
  { id: 2, nome: 'Álgebra', materia: 'Matemática', percentual: 60, tempo: 10 },
];

const Progresso: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Progresso</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Geral</h2>
          <div className="badge badge-info mb-2">{progressoGeral.percentual}% concluído</div>
          <div className="text-sm text-gray-700">Tempo total: {progressoGeral.tempo}h</div>
        </div>
        <div className="card col-span-2">
          <h2 className="font-semibold text-lg mb-2">Por Matéria</h2>
          <ul className="text-sm text-gray-700 flex flex-wrap gap-4">
            {materias.map(m => (
              <li key={m.id} className="bg-blue-50 rounded-lg px-4 py-2">
                <span className="font-medium text-blue-700">{m.nome}</span>: {m.percentual}% ({m.tempo}h)
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card mt-6">
        <h2 className="font-semibold text-lg mb-2">Por Assunto</h2>
        <ul className="text-sm text-gray-700 flex flex-wrap gap-4">
          {assuntos.map(a => (
            <li key={a.id} className="bg-blue-50 rounded-lg px-4 py-2">
              <span className="font-medium text-blue-700">{a.materia} - {a.nome}</span>: {a.percentual}% ({a.tempo}h)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Progresso; 