import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

interface LoginForm {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.senha);
      
      // Verificar se há um convite pendente
      const pendingToken = localStorage.getItem('pendingInviteToken');
      if (pendingToken) {
        try {
          await api.post(`/parceiros/aceitar-apos-registro/${pendingToken}`);
          localStorage.removeItem('pendingInviteToken');
          navigate('/parceiros');
          return;
        } catch (err: any) {
          console.error('Erro ao aceitar convite após login:', err);
          // Se falhar, continua para o dashboard
        }
      }
      
      navigate('/dashboard');
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Entrar</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" autoFocus {...register('email', { required: 'Informe o email' })} className="input-field" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Senha</label>
          <input type="password" {...register('senha', { required: 'Informe a senha' })} className="input-field" />
          {errors.senha && <span className="text-red-500 text-xs">{errors.senha.message}</span>}
        </div>
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">Não tem conta? </span>
          <Link to="/register" className="text-blue-600 hover:underline text-sm">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 