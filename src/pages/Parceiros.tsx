import React from 'react';

const parceirosMock = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', status: 'aceito' },
  { id: 2, nome: 'Maria Souza', email: 'maria@email.com', status: 'pendente' },
];

const statusBadge = (status: string) => {
  if (status === 'aceito') return <span className="badge badge-success">Aceito</span>;
  if (status === 'pendente') return <span className="badge badge-warning">Pendente</span>;
  return <span className="badge badge-danger">Rejeitado</span>;
};

const Parceiros: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Parceiros de Estudo</h1>
        <button className="btn-primary">+ Convidar Parceiro</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parceirosMock.map(parceiro => (
          <div key={parceiro.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{parceiro.nome}</div>
            <div className="text-gray-600 text-sm">{parceiro.email}</div>
            <div>{statusBadge(parceiro.status)}</div>
            <button className="btn-secondary mt-2 self-end">Ver Progresso</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parceiros; 