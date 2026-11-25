<?php
// salvar.php — recebe o formulário de Contato, confere e grava no banco.
// Complete cada ___ . A DICA diz onde achar a resposta (quase tudo está no index.html).

// ---------- 1. RECEBER ----------

// DICA: o method que está na tag <form> do index.html, em MAIÚSCULAS
if ($_SERVER['REQUEST_METHOD'] !== '___') {
    header('Location: index.html#contato');
    exit;
}

// DICA: o name de cada campo do formulário (Ctrl + F no index.html: name=")
$nome     = trim($_POST['___'] ?? '');
$email    = trim($_POST['___'] ?? '');
$servico  = trim($_POST['___'] ?? '');
$mensagem = trim($_POST['___'] ?? '');

// ---------- 2. CONFERIR ----------

// DICA: os 3 value das <option> do <select> (sem a opção vazia), entre aspas simples
$servicosValidos = ['___', '___', '___'];
$erros = [];

// DICA: o tamanho máximo da coluna nome na tabela (o número do VARCHAR)
if ($nome === '' || mb_strlen($nome) > ___) {
    $erros[] = 'nome';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 150) {
    $erros[] = 'email';
}
if (!in_array($servico, $servicosValidos, true)) {
    $erros[] = 'servico';
}
if ($mensagem === '') {
    $erros[] = 'mensagem';
}

if ($erros) {
    header('Location: index.html?erro=' . implode(',', $erros) . '#contato');
    exit;
}

// ---------- 3. GRAVAR ----------

// DICA: o arquivo que abre a conexão e cria o $pdo
require __DIR__ . '/___';

// DICA: os 4 "buracos" com : na frente, na mesma ordem das colunas
$sql = 'INSERT INTO contatos (nome, email, servico, mensagem)
        VALUES (___, ___, ___, ___)';

try {
    // DICA: primeiro o banco PREPARA o comando (em inglês, 7 letras)
    $comando = $pdo->___($sql);
    // DICA: depois EXECUTA com os valores (em inglês, 7 letras)
    $comando->___([
        ':nome'     => $nome,
        ':email'    => $email,
        ':servico'  => $servico,
        ':mensagem' => $mensagem,
    ]);
} catch (PDOException $erro) {
    error_log('Erro ao salvar: ' . $erro->getMessage());
    header('Location: index.html?erro=banco#contato');
    exit;
}

// DICA: o aviso de sucesso na URL é enviado=1
header('Location: index.html?___#contato');
exit;
