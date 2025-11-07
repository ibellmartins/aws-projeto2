# Projeto Integrador – Cloud Developing 2025/2

> CRUD simples + API Gateway + Lambda /report + RDS + CI/CD

**Grupo**:
<!-- no máximo 5 alunos -->

1. 10420398 - Isabella Sofia Martins - desenvolvimento back/front + configurações AWS
1. 10420574 - Jennifer Tondade - documentações 


## 1. Visão geral
O domínio escolhido foi a "Prateleira Virtual", uma aplicação simples desenvolvida para o usuário ter visibilidade de suas leituras, o quanto foi investido e quantidade de livros lidos. 
Nessa aplicação é possivel criar um card com as informações do novo livro, editar, deletar e passar o livro com leitura pendente para a lista de livros lidos.

## 2. Arquitetura
<p align="left">
  <img src="https://github.com/user-attachments/assets/0b853ae9-a9fd-439b-9f20-ec035bf9f6de" width="600" alt="Diagrama da Arquitetura">
</p>

<br/>

| Camada | Serviço | Descrição |
|--------|---------|-----------|
| Backend | ECS Fargate (ou EC2 + Docker) | API REST Node/Spring/… |
| Banco   | Amazon RDS              | PostgreSQL / MySQL em subnet privada |
| Gateway | Amazon API Gateway      | Rotas CRUD → ECS · `/report` → Lambda |
| Função  | AWS Lambda              | Consome a API, gera estatísticas JSON |
| CI/CD   | CodePipeline + GitHub   | push → build → ECR → deploy |

## 3. Como rodar localmente

```bash
#1. Backend
cd projeto2/backend
npm install  # todas as dependencias do node
node src/index.js  # backend em http://localhost:3001/books

#2. Frontend
cd projeto2/frontend
npm install
npm start

#3. Lambda
cd projeto2/backend/src
node handler.js

#4. Conteinerizar
docker build -t books-api . #img do docker
docker run -d -p 3001:3001 --name books-api-container books-api
docker ps
#testar API em http://localhost:3001

#5. Lambda local com backend Docker
node src/handler.js #roda lambda local
const response = await fetch("http://localhost:3001/books"); #faz fetch para API local - deve retornar JSON com estatísticas
