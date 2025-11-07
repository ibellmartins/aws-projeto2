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

![Diagrama](docs/arquitetura.png)

| Camada | Serviço | Descrição |
|--------|---------|-----------|
| Backend | ECS Fargate (ou EC2 + Docker) | API REST Node/Spring/… |
| Banco   | Amazon RDS              | PostgreSQL / MySQL em subnet privada |
| Gateway | Amazon API Gateway      | Rotas CRUD → ECS · `/report` → Lambda |
| Função  | AWS Lambda              | Consome a API, gera estatísticas JSON |
| CI/CD   | CodePipeline + GitHub   | push → build → ECR → deploy |

## 3. Como rodar localmente

```bash
cp .env.example .env         # configure variáveis
docker compose up --build
# API em http://localhost:3000
