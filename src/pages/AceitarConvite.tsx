import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AceitarConvite: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processando seu convite...');
  const [error, setError] = useState('');

  useEffect(() => {
    const aceitar = async () => {
      if (!token) {
        setError('Token não fornecido.');
        return;
      }
      try {
        const response = await api.post(`/parceiros/aceitar/${token}`);
        setMessage(response.data.message);
        setTimeout(() => navigate('/parceiros'), 3000); // Redirect to partners page
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao aceitar o convite.');
        setMessage('');
      }
    };

    aceitar();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card text-center">
        <h1 className="text-2xl font-bold mb-4">Aceite de Convite</h1>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AceitarConvite; 