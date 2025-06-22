import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Painel Principal</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Metas Ativas</h2>
          <div className="badge badge-info mb-2">3 em andamento</div>
          <ul className="text-sm text-gray-700">
            <li>Meta 1: 40% concluído</li>
            <li>Meta 2: 20% concluído</li>
            <li>Meta 3: 80% concluído</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Progresso Geral</h2>
          <div className="badge badge-success mb-2">60% concluído</div>
          <div className="text-sm text-gray-700">Tempo total: 120h</div>
        </div>
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Próximas Tarefas</h2>
          <ul className="text-sm text-gray-700">
            <li>Estudar: Gramática</li>
            <li>Revisar: Questão 12</li>
            <li>Completar: Meta 2</li>
          </ul>
        </div>
      </div>
      <div className="card mt-6">
        <h2 className="font-semibold text-lg mb-2">Calendário de Estudos</h2>
        <div className="text-gray-500 text-sm">(Em breve: calendário interativo)</div>
      </div>
    </div>
  );
};

export default Dashboard; 