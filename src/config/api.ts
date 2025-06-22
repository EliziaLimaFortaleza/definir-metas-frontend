// Configuração da API
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001/api' 
  : 'https://definir-metas-backend.vercel.app/api';

// Configurações do Axios
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Endpoints da API
export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/registro',
    VERIFY: '/auth/verificar',
  },
  // Concursos
  CONCURSOS: '/concursos',
  // Matérias
  MATERIAS: '/materias',
  // Metas
  METAS: '/metas',
  // Estudos
  ESTUDOS: '/estudos',
  // Questões
  QUESTOES: '/questoes',
  // Parceiros
  PARCEIROS: '/parceiros',
  // Progresso
  PROGRESSO: {
    GERAL: '/progresso/geral',
    MATERIAS: '/progresso/materias',
    HISTORICO: '/progresso/historico',
  },
}; 