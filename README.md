# Definir Metas - Frontend

Frontend do Sistema de Estudos Pessoal desenvolvido em React com TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Icons

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/definir-metas-frontend.git
cd definir-metas-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
```bash
# Crie um arquivo .env na raiz do projeto
REACT_APP_API_URL=http://localhost:3001/api
```

4. Execute o projeto:
```bash
# Desenvolvimento
npm start

# Build para produção
npm run build
```

## 🌐 Deploy no Vercel

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `REACT_APP_API_URL=https://seu-backend.vercel.app/api`
3. Deploy automático a cada push

## 📱 Funcionalidades

### 🔐 Autenticação
- Login e registro de usuários
- Proteção de rotas
- Gerenciamento de sessão

### 🎯 Gestão de Concursos
- Cadastro de concursos
- Visualização de concursos ativos
- Edição e exclusão

### 📚 Gestão de Matérias
- Cadastro de matérias por concurso
- Organização por tópicos
- Progresso por matéria

### 🎯 Definição de Metas
- Criação de metas de estudo
- Acompanhamento de progresso
- Notificações de prazo

### 📖 Registro de Estudos
- Log de sessões de estudo
- Tempo dedicado por matéria
- Histórico de estudos

### ❓ Banco de Questões
- Cadastro de questões
- Categorização por matéria
- Análise de performance

### 👥 Sistema de Parceiros
- Convite de parceiros de estudo
- Compartilhamento de metas
- Acompanhamento mútuo

### 📊 Acompanhamento de Progresso
- Dashboard com estatísticas
- Gráficos de progresso
- Relatórios de performance

## 🎨 Interface

- Design moderno e responsivo
- Tema escuro/claro
- Interface intuitiva
- Componentes reutilizáveis

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React (Auth, etc.)
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
└── utils/              # Utilitários
```

## 🚀 Scripts Disponíveis

- `npm start` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm test` - Executa testes
- `npm run eject` - Eject do Create React App

## 🔗 Integração com Backend

O frontend se comunica com o backend através de:
- Axios para requisições HTTP
- JWT para autenticação
- RESTful API

## 📝 Licença

Este projeto está sob a licença MIT. 