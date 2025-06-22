import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Materia {
  id: number;
  nome: string;
  descricao: string;
  ordem: number;
}

const Materias: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ordem, setOrdem] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMaterias = async () => {
    setLoading(true);
    try {
      const response = await api.get('/materias');
      setMaterias(response.data);
    } catch {
      setError('Erro ao carregar matérias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/materias', { nome, descricao, ordem });
      setSuccess('Matéria criada com sucesso!');
      setNome('');
      setDescricao('');
      setOrdem(1);
      setShowModal(false);
      fetchMaterias();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar matéria.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta matéria?')) {
      try {
        await api.delete(`/materias/${id}`);
        setSuccess('Matéria removida com sucesso.');
        fetchMaterias();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao remover matéria.');
      }
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Matérias</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Nova Matéria</button>
      </div>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materias.map(materia => (
            <div key={materia.id} className="card flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-700">{materia.nome}</div>
              <div className="text-gray-600 text-sm">{materia.descricao}</div>
              <div className="text-gray-400 text-xs">Ordem: {materia.ordem}</div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="btn-secondary">Ver Assuntos</button>
                <button className="btn-danger" onClick={() => handleDelete(materia.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-xl font-bold mb-4">Nova Matéria</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group mb-2">
                <label htmlFor="nome">Nome da Matéria</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
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
              <div className="form-group mb-2">
                <label htmlFor="ordem">Ordem</label>
                <input
                  id="ordem"
                  type="number"
                  min="1"
                  value={ordem}
                  onChange={e => setOrdem(parseInt(e.target.value))}
                  required
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

export default Materias; 