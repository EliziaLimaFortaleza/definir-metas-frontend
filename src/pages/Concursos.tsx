import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Concurso {
  id: number;
  nome: string;
  cargo: string;
  created_at: string;
}

const Concursos: React.FC = () => {
  const [concursos, setConcursos] = useState<Concurso[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchConcursos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/concursos');
      setConcursos(response.data);
    } catch {
      setError('Erro ao carregar concursos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcursos();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/concursos', { nome, cargo });
      setSuccess('Concurso criado com sucesso!');
      setNome('');
      setCargo('');
      setShowModal(false);
      fetchConcursos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar concurso.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este concurso?')) {
      try {
        await api.delete(`/concursos/${id}`);
        setSuccess('Concurso removido com sucesso.');
        fetchConcursos();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao remover concurso.');
      }
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Concursos</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Novo Concurso</button>
      </div>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concursos.map(concurso => (
            <div key={concurso.id} className="card flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-700">{concurso.nome}</div>
              <div className="text-gray-600 text-sm">Cargo: <span className="font-medium">{concurso.cargo}</span></div>
              <div className="text-gray-400 text-xs">Cadastrado em {concurso.created_at}</div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="btn-secondary">Ver Detalhes</button>
                <button className="btn-danger" onClick={() => handleDelete(concurso.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-xl font-bold mb-4">Novo Concurso</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group mb-2">
                <label htmlFor="nome">Nome do Concurso</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="cargo">Cargo</label>
                <input
                  id="cargo"
                  type="text"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
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

export default Concursos; 