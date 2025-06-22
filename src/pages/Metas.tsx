import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Meta {
  id: number;
  titulo: string;
  status: string;
  percentual?: number;
}

const statusBadge = (status: string) => {
  if (status === 'concluida') return <span className="badge badge-success">Concluída</span>;
  if (status === 'em_andamento') return <span className="badge badge-info">Em andamento</span>;
  return <span className="badge badge-warning">Pendente</span>;
};

const Metas: React.FC = () => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMetas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/metas');
      setMetas(response.data);
    } catch {
      setError('Erro ao carregar metas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetas();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/metas', { titulo, descricao, tipo: 'geral' });
      setSuccess('Meta criada com sucesso!');
      setTitulo('');
      setDescricao('');
      setShowModal(false);
      fetchMetas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar meta.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta meta?')) {
      try {
        await api.delete(`/metas/${id}`);
        setSuccess('Meta removida com sucesso.');
        fetchMetas();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao remover meta.');
      }
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Metas de Estudo</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Nova Meta</button>
      </div>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metas.map(meta => (
            <div key={meta.id} className="card flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-700">{meta.titulo}</div>
              <div>{statusBadge(meta.status)}</div>
              <div className="text-gray-600 text-sm">Progresso: {meta.percentual ?? 0}%</div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="btn-secondary">Ver Detalhes</button>
                <button className="btn-danger" onClick={() => handleDelete(meta.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-xl font-bold mb-4">Nova Meta</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group mb-2">
                <label htmlFor="titulo">Título</label>
                <input
                  id="titulo"
                  type="text"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Criar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metas; 