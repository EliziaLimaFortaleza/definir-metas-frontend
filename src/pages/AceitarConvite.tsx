import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AceitarConvite: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processando seu convite...');
  const [error, setError] = useState('');
  const [requiresRegistration, setRequiresRegistration] = useState(false);
  const [inviterName, setInviterName] = useState('');

  useEffect(() => {
    const aceitar = async () => {
      if (!token) {
        setError('Token não fornecido.');
        return;
      }
      try {
        const response = await api.post(`/parceiros/aceitar/${token}`);
        
        if (response.data.requiresRegistration) {
          // Usuário precisa se cadastrar primeiro
          setRequiresRegistration(true);
          setInviterName(response.data.inviterName);
          setMessage('Você precisa se cadastrar primeiro para aceitar este convite.');
        } else {
          // Convite aceito com sucesso
          setMessage(response.data.message);
          setTimeout(() => navigate('/parceiros'), 3000);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao aceitar o convite.');
        setMessage('');
      }
    };

    aceitar();
  }, [token, navigate]);

  const handleRegister = () => {
    // Salvar o token no localStorage para usar após o registro
    localStorage.setItem('pendingInviteToken', token || '');
    navigate('/register');
  };

  const handleLogin = () => {
    // Salvar o token no localStorage para usar após o login
    localStorage.setItem('pendingInviteToken', token || '');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Convite de Parceria</h1>
        
        {requiresRegistration ? (
          <div>
            <p className="text-gray-600 mb-4">
              {inviterName} convidou você para ser um parceiro de estudos!
            </p>
            <p className="text-gray-600 mb-6">
              Para aceitar este convite, você precisa ter uma conta no sistema.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRegister}
                className="btn btn-primary w-full"
              >
                Criar Conta
              </button>
              <button
                onClick={handleLogin}
                className="btn btn-secondary w-full"
              >
                Já tenho conta - Fazer Login
              </button>
            </div>
          </div>
        ) : (
          <div>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && !error && (
              <p className="text-gray-500 text-sm">
                Redirecionando para a página de parceiros...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AceitarConvite; 