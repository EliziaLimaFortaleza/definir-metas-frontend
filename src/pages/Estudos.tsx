import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Estudo {
  id: number;
  data: string;
  materia: string;
  assunto: string;
  duracao: number;
  observacoes: string;
}

const Estudos: React.FC = () => {
  const [estudos, setEstudos] = useState<Estudo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState('');
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [duracao, setDuracao] = useState(30);
  const [observacoes, setObservacoes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEstudos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/estudos');
      setEstudos(response.data);
    } catch {
      setError('Erro ao carregar estudos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudos();
    // Definir data atual como padrão
    const hoje = new Date().toISOString().split('T')[0];
    setData(hoje);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/estudos', { 
        data, 
        materia, 
        assunto, 
        duracao, 
        observacoes 
      });
      setSuccess('Estudo registrado com sucesso!');
      setData(new Date().toISOString().split('T')[0]);
      setMateria('');
      setAssunto('');
      setDuracao(30);
      setObservacoes('');
      setShowModal(false);
      fetchEstudos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar estudo.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este registro de estudo?')) {
      try {
        await api.delete(`/estudos/${id}`);
        setSuccess('Estudo removido com sucesso.');
        fetchEstudos();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao remover estudo.');
      }
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Registro de Estudos</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Novo Registro</button>
      </div>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {estudos.map(estudo => (
            <div key={estudo.id} className="card flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-700">{estudo.materia} - {estudo.assunto}</div>
              <div className="text-gray-600 text-sm">{estudo.data} | {estudo.duracao} min</div>
              <div className="text-gray-500 text-xs">{estudo.observacoes}</div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="btn-secondary">Ver Detalhes</button>
                <button className="btn-danger" onClick={() => handleDelete(estudo.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-xl font-bold mb-4">Novo Registro de Estudo</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group mb-2">
                <label htmlFor="data">Data</label>
                <input
                  id="data"
                  type="date"
                  value={data}
                  onChange={e => setData(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="materia">Matéria</label>
                <input
                  id="materia"
                  type="text"
                  value={materia}
                  onChange={e => setMateria(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="assunto">Assunto</label>
                <input
                  id="assunto"
                  type="text"
                  value={assunto}
                  onChange={e => setAssunto(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="duracao">Duração (minutos)</label>
                <input
                  id="duracao"
                  type="number"
                  min="1"
                  value={duracao}
                  onChange={e => setDuracao(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  value={observacoes}
                  onChange={e => setObservacoes(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estudos; 