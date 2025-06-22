import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Questao {
  id: number;
  texto: string;
  materia: string;
  assunto: string;
  foi_refeita: boolean;
}

const Questoes: React.FC = () => {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [texto, setTexto] = useState('');
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuestoes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/questoes');
      setQuestoes(response.data);
    } catch {
      setError('Erro ao carregar questões.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestoes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/questoes', { 
        texto, 
        materia, 
        assunto, 
        comentario 
      });
      setSuccess('Questão criada com sucesso!');
      setTexto('');
      setMateria('');
      setAssunto('');
      setComentario('');
      setShowModal(false);
      fetchQuestoes();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar questão.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta questão?')) {
      try {
        await api.delete(`/questoes/${id}`);
        setSuccess('Questão removida com sucesso.');
        fetchQuestoes();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao remover questão.');
      }
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Caderno de Questões</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Nova Questão</button>
      </div>
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questoes.map(questao => (
            <div key={questao.id} className="card flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-700">{questao.materia} - {questao.assunto}</div>
              <div className="text-gray-700 text-sm">{questao.texto}</div>
              <div className={questao.foi_refeita ? 'badge badge-success' : 'badge badge-warning'}>
                {questao.foi_refeita ? 'Refeita' : 'Pendente'}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="btn-secondary">Ver Detalhes</button>
                <button className="btn-danger" onClick={() => handleDelete(questao.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-xl font-bold mb-4">Nova Questão</h2>
            <form onSubmit={handleCreate}>
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
                <label htmlFor="texto">Questão</label>
                <textarea
                  id="texto"
                  value={texto}
                  onChange={e => setTexto(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="comentario">Comentário</label>
                <textarea
                  id="comentario"
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
                  rows={3}
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

export default Questoes; 