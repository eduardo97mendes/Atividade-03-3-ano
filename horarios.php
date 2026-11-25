<?php
// horarios.php — responde em JSON quais horários de um dia já estão ocupados.
// Quem chama é o js/agenda.js: horarios.php?data=2026-12-01
// Resposta: {"ocupados": ["09:00", "14:00"]}
// Complete cada ___ . A DICA logo acima diz onde achar a resposta.

// DICA: a resposta é JSON. O tipo é application/___ (4 letras)
header('Content-Type: application/___; charset=utf-8');

// DICA: a data vem no endereço (horarios.php?data=...): a variável do PHP para isso é $_GET.
// O nome da chave é o que vem antes do = no endereço
$data = $_GET['___'] ?? '';

// A data tem que vir no formato do <input type="date">: 2026-12-01
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'data']);
    exit;
}

// DICA: o mesmo arquivo de conexão do salvar.php
require __DIR__ . '/___';

// to_char deixa o horário como texto "09:00" (sem os segundos)
$sql = "SELECT to_char(horario, 'HH24:MI') FROM agendamentos
        WHERE data = ___ ORDER BY horario";   // DICA: o "buraco" com : na frente, igual ao do execute abaixo

$comando = $pdo->prepare($sql);
$comando->execute([':data' => $data]);

// fetchAll(PDO::FETCH_COLUMN) = só a lista de horários: ["09:00", "14:00"]
// DICA: a função que transforma um array do PHP em JSON (json_ + 6 letras, "codificar" em inglês)
echo ___(['ocupados' => $comando->fetchAll(PDO::FETCH_COLUMN)]);
