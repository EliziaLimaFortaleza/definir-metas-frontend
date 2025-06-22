import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Parceiro {
  id: number;
  parceiro_nome: string;
  parceiro_email: string;
  status: 'aceito' | 'pendente' | 'rejeitado';
}

const statusBadge = (status: string) => {
  if (status === 'aceito') return <span className="badge badge-success">Aceito</span>;
  if (status === 'pendente') return <span className="badge badge-warning">Pendente</span>;
  return <span className="badge badge-danger">Rejeitado</span>;
};

const Parceiros: React.FC = () => {
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchParceiros = async () => {
    try {
      const response = await api.get('/parceiros');
      setParceiros(response.data);
    } catch (err) {
      setError('Erro ao carregar parceiros.');
    }
  };

  useEffect(() => {
    fetchParceiros();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await api.post('/parceiros/convidar', { email });
      setSuccess(response.data.message);
      setEmail('');
      setShowModal(false);
      fetchParceiros(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar convite.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este parceiro?')) {
      try {
        await api.delete(`/parceiros/${id}`);
        setSuccess('Parceiro removido com sucesso.');
        fetchParceiros(); // Refresh list
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao remover parceiro.');
      }
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Parceiros de Estudo</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Convidar Parceiro</button>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parceiros.map(parceiro => (
          <div key={parceiro.id} className="card flex flex-col gap-2">
            <div className="font-semibold text-lg text-blue-700">{parceiro.parceiro_nome || 'Nome não definido'}</div>
            <div className="text-gray-600 text-sm">{parceiro.parceiro_email}</div>
            <div>{statusBadge(parceiro.status)}</div>
            <div className="flex justify-end gap-2 mt-2">
              <button className="btn-secondary" disabled={parceiro.status !== 'aceito'}>Ver Progresso</button>
              <button className="btn-danger" onClick={() => handleDelete(parceiro.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-xl font-bold mb-4">Convidar Parceiro</h2>
            <form onSubmit={handleInvite}>
              <div className="form-group">
                <label htmlFor="email">Email do Parceiro</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Enviar Convite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parceiros; 