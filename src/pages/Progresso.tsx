import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface ProgressoGeral {
  total_concursos: number;
  total_materias: number;
  total_assuntos: number;
  total_metas: number;
  metas_concluidas: number;
  percentual_metas_concluidas: number;
  total_estudos: number;
  tempo_total_horas: number;
  total_questoes: number;
  total_parceiros: number;
}

interface ProgressoMateria {
  id: number;
  nome: string;
  descricao: string;
  total_assuntos: number;
  total_estudos: number;
  tempo_horas: number;
  total_questoes: number;
  questoes_refeitas: number;
  percentual_questoes_refeitas: number;
  percentual_questoes_acertadas: number;
}

const Progresso: React.FC = () => {
  const [progressoGeral, setProgressoGeral] = useState<ProgressoGeral | null>(null);
  const [progressoMaterias, setProgressoMaterias] = useState<ProgressoMateria[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProgresso = async () => {
    setLoading(true);
    try {
      const [geralResponse, materiasResponse] = await Promise.all([
        api.get('/progresso/geral'),
        api.get('/progresso/materias')
      ]);
      setProgressoGeral(geralResponse.data);
      setProgressoMaterias(materiasResponse.data);
    } catch {
      setError('Erro ao carregar progresso.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgresso();
  }, []);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 alert alert-danger">{error}</div>;
  if (!progressoGeral) return <div className="p-6">Nenhum dado encontrado.</div>;

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Progresso</h1>
      
      {/* Progresso Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Geral</h2>
          <div className="badge badge-info mb-2">{progressoGeral.percentual_metas_concluidas}% concluído</div>
          <div className="text-sm text-gray-700">Tempo total: {progressoGeral.tempo_total_horas}h</div>
          <div className="text-sm text-gray-700">Metas: {progressoGeral.metas_concluidas}/{progressoGeral.total_metas}</div>
        </div>
        
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Estatísticas</h2>
          <div className="text-sm text-gray-700">Concursos: {progressoGeral.total_concursos}</div>
          <div className="text-sm text-gray-700">Matérias: {progressoGeral.total_materias}</div>
          <div className="text-sm text-gray-700">Assuntos: {progressoGeral.total_assuntos}</div>
          <div className="text-sm text-gray-700">Questões: {progressoGeral.total_questoes}</div>
        </div>
        
        <div className="card">
          <h2 className="font-semibold text-lg mb-2">Atividade</h2>
          <div className="text-sm text-gray-700">Estudos: {progressoGeral.total_estudos}</div>
          <div className="text-sm text-gray-700">Parceiros: {progressoGeral.total_parceiros}</div>
        </div>
      </div>

      {/* Progresso por Matéria */}
      <div className="card">
        <h2 className="font-semibold text-lg mb-4">Por Matéria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressoMaterias.map(materia => (
            <div key={materia.id} className="bg-blue-50 rounded-lg p-4">
              <div className="font-medium text-blue-700 mb-2">{materia.nome}</div>
              <div className="text-sm text-gray-700">
                <div>Tempo: {materia.tempo_horas}h</div>
                <div>Estudos: {materia.total_estudos}</div>
                <div>Questões: {materia.total_questoes}</div>
                <div>Refeitas: {materia.percentual_questoes_refeitas}%</div>
                <div>Acertadas: {materia.percentual_questoes_acertadas}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progresso; 