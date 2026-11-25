<?php
// agendar.php — recebe o agendamento do js/agenda.js (em JSON), confere e grava no banco.
// Responde em JSON: {"ok": true} ou {"ok": false, ...}
// Complete cada ___ . A DICA logo acima diz onde achar a resposta.

header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Sao_Paulo');

// ---------- 1. RECEBER ----------

// DICA: o method que está no fetch do js/agenda.js, em MAIÚSCULAS
if ($_SERVER['REQUEST_METHOD'] !== '___') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'metodo']);
    exit;
}

// O fetch manda JSON no corpo do pedido (não é $_POST): lemos e transformamos em array
// DICA: o contrário de json_encode: transforma o texto JSON em array (json_ + 6 letras)
$dados = ___(file_get_contents('php://input'), true) ?? [];

$nome    = trim($dados['nome'] ?? '');
$email   = trim($dados['email'] ?? '');
$data    = trim($dados['data'] ?? '');
// DICA: o nome da propriedade no objeto pedido do js/agenda.js
$horario = trim($dados['___'] ?? '');

// ---------- 2. CONFERIR ----------

// Os mesmos horários da lista HORARIOS do js/agenda.js
$horariosValidos = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
$erros = [];

if ($nome === '' || mb_strlen($nome) > 100) {
    $erros[] = 'nome';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) {
    $erros[] = 'email';
}
// Data no formato 2026-12-01, que existe no calendário e não é no passado
$partes = explode('-', $data);
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)
    || !checkdate((int) $partes[1], (int) $partes[2], (int) $partes[0])
    || $data < date('Y-m-d')) {
    $erros[] = 'data';
}
if (!in_array($horario, $horariosValidos, true)) {
    $erros[] = 'horario';
}

if ($erros) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erros' => $erros]);
    exit;
}

// ---------- 3. GRAVAR ----------

require __DIR__ . '/conexao.php';

// DICA: o nome da tabela criada na PARTE 4 do banco.sql
// e os 4 "buracos" com : na frente, na mesma ordem das colunas
$sql = 'INSERT INTO ___ (nome, email, data, horario)
        VALUES (___, ___, ___, ___)';

try {
    // DICA: igual ao salvar.php: primeiro PREPARA, depois EXECUTA
    $comando = $pdo->___($sql);
    $comando->___([
        ':nome'    => $nome,
        ':email'   => $email,
        ':data'    => $data,
        ':horario' => $horario,
    ]);
} catch (PDOException $erro) {
    // 23505 = o banco recusou por causa do UNIQUE (data, horario): alguém pegou antes
    if ($erro->getCode() === '23505') {
        http_response_code(409);
        // DICA: o js/agenda.js confere dados.erro === '...' para avisar que o horário foi ocupado
        echo json_encode(['ok' => false, 'erro' => '___']);
        exit;
    }
    error_log('Erro ao agendar: ' . $erro->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'banco']);
    exit;
}

// DICA: o js/agenda.js confere dados.ok. Gravou: ok vale...
echo json_encode(['ok' => ___]);
