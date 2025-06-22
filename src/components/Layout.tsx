import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Painel' },
  { to: '/concursos', label: 'Concursos' },
  { to: '/materias', label: 'Matérias' },
  { to: '/metas', label: 'Metas' },
  { to: '/estudos', label: 'Estudos' },
  { to: '/questoes', label: 'Questões' },
  { to: '/parceiros', label: 'Parceiros' },
  { to: '/progresso', label: 'Progresso' },
];

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      <aside className="w-56 bg-white shadow-lg flex flex-col p-4">
        <div className="font-bold text-xl text-blue-700 mb-8 text-center">Definir Metas</div>
        <nav className="flex-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg mb-2 text-gray-700 hover:bg-blue-100 transition-colors ${isActive ? 'bg-blue-100 font-semibold text-blue-700' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 text-center">
          <div className="text-sm text-gray-500 mb-2">{user?.nome}</div>
          <button onClick={handleLogout} className="btn-secondary w-full">Sair</button>
        </div>
      </aside>
      <main className="flex-1 min-h-screen bg-blue-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 