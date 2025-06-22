import React from 'react';

const metasMock = [
  { id: 1, titulo: 'Meta Geral', status: 'em_andamento', percentual: 40 },
  { id: 2, titulo: 'Meta Concurso PF', status: 'pendente', percentual: 0 },
  { id: 3, titulo: 'Meta TRF', status: 'concluida', percentual: 100 },
];

const statusBadge = (status: string) => {
  if (status === 'concluida') return <span className="badge badge-success">Concluída</span>;
  if (status === 'em_andamento') return <span className="badge badge-info">Em andamento</span>;
  return <span className="badge badge-warning">Pendente</span>;
};

const Metas: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Metas de Estudo</h1>
        <button className="btn-primary">+ Nova Meta</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metasMock.map(meta => (
          <div key={meta.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{meta.titulo}</div>
            <div>{statusBadge(meta.status)}</div>
            <div className="text-gray-600 text-sm">Progresso: {meta.percentual}%</div>
            <button className="btn-secondary mt-2 self-end">Ver Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metas; 