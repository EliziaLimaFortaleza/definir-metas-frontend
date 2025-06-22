import React from 'react';

const questoesMock = [
  { id: 1, texto: 'O que é sujeito oculto?', materia: 'Português', assunto: 'Gramática', foi_refeita: false },
  { id: 2, texto: 'Explique o princípio da legalidade.', materia: 'Direito Constitucional', assunto: 'Princípios', foi_refeita: true },
];

const Questoes: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Caderno de Questões</h1>
        <button className="btn-primary">+ Nova Questão</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questoesMock.map(questao => (
          <div key={questao.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{questao.materia} - {questao.assunto}</div>
            <div className="text-gray-700 text-sm">{questao.texto}</div>
            <div className={questao.foi_refeita ? 'badge badge-success' : 'badge badge-warning'}>
              {questao.foi_refeita ? 'Refeita' : 'Pendente'}</div>
            <button className="btn-secondary mt-2 self-end">Ver Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questoes; 