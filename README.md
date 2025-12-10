# Employee Vision Hub

## 📘 Documentação — Projeto SAAM

Este repositório contém a API e o Frontend do projeto **Employee Vision Hub**, incluindo todo o ambiente configurado para execução via **Docker** e **Docker Compose**. Esse projeto faz parte de um desafio da **SAAM Auditoria (SISAUDCON)**.

---

## 🚀 Tecnologias Utilizadas

### **Backend (API)**
- **Java 17**
- **Spring Boot**
- **Spring Security**
- **PostgreSQL**
- **Flyway**
- **JPA / Hibernate**
- **Maven**

### **Frontend**
- **React**
- **Vite**
- **TypeScript**
- **shadcn/ui**
- **TailwindCSS**

### **Infraestrutura**
- **Docker**
- **Docker Compose**

---

## 📦 Pré-requisitos

Antes de executar o projeto, você deve ter instalado localmente:

- **Docker**
- **Docker Compose**

Nada além disso é necessário — não é preciso instalar Java, Node, PostgreSQL etc.

---

## ▶️ Como executar o projeto

Para subir toda a aplicação (API, banco e frontend), basta executar na raiz do repositório:

```sh
docker compose up --build
