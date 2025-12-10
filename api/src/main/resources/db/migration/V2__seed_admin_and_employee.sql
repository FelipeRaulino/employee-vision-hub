-- Inserindo roles
INSERT INTO roles (name) VALUES ('ROLE_ADMINISTRATOR');
INSERT INTO roles (name) VALUES ('ROLE_EMPLOYEE');

-- Inserindo usuário admin
INSERT INTO users (email, password)
VALUES ('saam_admin@example.com', '$2a$12$zA1v/Ul2PQHdEoh7slBAyOoAyxjzBGitJple8doyJxQPH6FVVMi1W'); 
-- senha = "saam_admin@123" (BCrypt)

-- Vinculando usuário admin à role de administrador
INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'saam_admin@example.com' AND r.name = 'ROLE_ADMINISTRATOR';

-- Inserindo um funcionário
INSERT INTO employees (name, admission_date, salary, status)
VALUES ('Rita Malu Sophie Rocha', '2025-01-01', 3500.00, 'ACTIVE');
