import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterForm {
  nome: string;
  email: string;
  senha: string;
}

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.nome, data.email, data.senha);
      navigate('/dashboard');
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Criar Conta</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nome</label>
          <input type="text" autoFocus {...register('nome', { required: 'Informe o nome' })} className="input-field" />
          {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" {...register('email', { required: 'Informe o email' })} className="input-field" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Senha</label>
          <input type="password" {...register('senha', { required: 'Informe a senha', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })} className="input-field" />
          {errors.senha && <span className="text-red-500 text-xs">{errors.senha.message}</span>}
        </div>
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Conta'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-500 text-sm">Já tem conta? </span>
          <Link to="/login" className="text-blue-600 hover:underline text-sm">Entrar</Link>
        </div>
      </form>
    </div>
  );
};

export default Register; 