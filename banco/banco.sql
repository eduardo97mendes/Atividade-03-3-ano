-- banco.sql — complete cada ___ e rode no Beekeeper UMA PARTE POR VEZ
-- (selecione o trecho com o mouse e aperte Ctrl + Enter)

-- PARTE 1 · Criar o banco (conectado no banco postgres, só esta linha)
-- DICA: o nome que está no $banco do config.exemplo.php
CREATE DATABASE ___;

-- PARTE 2 · Criar a tabela (troque antes para o banco educacao)
-- DICA: cada coluna tem o MESMO nome do name do campo no formulário
CREATE TABLE contatos (
    id         SERIAL PRIMARY KEY,             -- SERIAL numera sozinho: 1, 2, 3...
    ___        VARCHAR(100) NOT NULL,
    ___        VARCHAR(150) NOT NULL,
    ___        VARCHAR(20) NOT NULL
               CHECK (servico IN ('___', '___', '___')),   -- DICA: os 3 value do <select>
    ___        TEXT NOT NULL,                  -- TEXT = texto longo, sem limite
    criado_em  TIMESTAMP NOT NULL DEFAULT NOW()   -- NOW() = data e hora de agora
);

-- PARTE 3 · Testar à mão
INSERT INTO contatos (nome, email, servico, mensagem)
VALUES ('Teste da Turma', 'teste@exemplo.com', 'basico', 'Primeiro registro feito no Beekeeper.');

SELECT * FROM contatos;

-- PARTE 4 · Tabela da agenda online (3º ano · no banco educacao)
-- DICA: as colunas têm os MESMOS nomes das propriedades do pedido no js/agenda.js
CREATE TABLE ___ (                              -- DICA: o nome que está no INSERT do agendar.php
    id         SERIAL PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    data       ___ NOT NULL,                    -- DICA: tipo que guarda SÓ a data: "data" em inglês (4 letras)
    horario    ___ NOT NULL,                    -- DICA: tipo que guarda SÓ a hora: "tempo" em inglês (4 letras)
    criado_em  TIMESTAMP NOT NULL DEFAULT NOW(),
    ___ (data, horario)                         -- DICA: palavra que proíbe repetir o mesmo dia + hora: "único" em inglês (6 letras)
);

SELECT * FROM agendamentos ORDER BY data, horario;
