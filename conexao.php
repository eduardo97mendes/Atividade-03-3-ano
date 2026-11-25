<?php
// conexao.php — abre a conexão com o PostgreSQL.
// Complete cada ___ . A DICA diz onde achar a resposta.

// DICA: o arquivo que tem a sua senha (a cópia do config.exemplo.php)
require __DIR__ . '/___';

// DICA: o "apelido" do PostgreSQL no PHP tem 5 letras: pgsql
$dsn = "___:host=$host;port=$porta;dbname=$banco";

try {
    // DICA: a classe do PHP que conversa com bancos de dados (3 letras maiúsculas)
    $pdo = new ___($dsn, $usuario, $senha, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
// DICA: o tipo de erro do PDO = PDO + Exception, tudo junto
} catch (___ $erro) {
    error_log('Erro de conexão: ' . $erro->getMessage());
    http_response_code(500);
    exit('Não foi possível conectar ao banco de dados.');
}
