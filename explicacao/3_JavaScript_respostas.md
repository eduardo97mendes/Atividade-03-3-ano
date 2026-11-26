# 📘 Explicação · JavaScript da EducaCão (3º ano)

Versão **com as respostas e explicação**, para você entender o porquê de cada linha. Tente completar sozinho primeiro; use este arquivo quando travar.

## 1. Como o JavaScript entra na página

No fim do `index.html`, antes do `</body>`:

```html
<script src="js/patinhas.js"></script>
<script src="js/agenda.js"></script>
```

Fica **no fim** porque o JavaScript procura elementos do HTML (`#agenda-data`, `#form-agenda`...). Se viesse no `<head>`, ele rodaria antes de esses elementos existirem e o `querySelector` devolveria `null`.

O visual das partes de JavaScript está pronto em `css/javascript.css`. O JavaScript **não pinta nada**: ele só cria elementos e troca **classes** (`pata`, `selecionado`, `ocupado`, `sucesso`, `erro`), e o CSS cuida da aparência.

---

## 2. Patinhas 🐾 (`js/patinhas.js`)

| Lacuna | Resposta | Por quê |
| --- | --- | --- |
| evento | `'click'` | `submit` é de formulário, `change` é de campo que muda de valor. |
| criar | `document.createElement` | `querySelector` e `getElementById` **procuram** um elemento que já existe; `createElement` **cria** um novo. |
| classe | `'pata'` | No CSS escrevemos `.pata`, mas o ponto é só a forma do seletor; o nome da classe é `pata`. |
| posição | `evento.pageX` | `pageX` = horizontal (esquerda), `pageY` = vertical (topo). `target` é o elemento clicado, não a posição. |
| sorteio | `Math.random()` | Dá um número entre 0 e 1. `* 61` vira 0 a 60,99; `Math.floor` corta para 0 a 60; `- 30` fica de -30 a 30. |
| colocar | `appendChild` | O elemento criado só aparece quando entra na página (dentro do `body`). |
| tempo | `1000` | O `setTimeout` conta em **milissegundos**: 1000 ms = 1 s, o mesmo tempo da animação do CSS. |

```js
// patinhas.js — cada clique na página deixa uma pegada 🐾 que some sozinha.
// O visual (tamanho, animação) está pronto no css/javascript.css (classe .pata).

// 1. Ouvir o clique em QUALQUER lugar da página
document.addEventListener('click', function (evento) {

    // 2. Criar um elemento novo: <span></span>
    const pata = document.createElement('span');

    // 3. Dar a classe do CSS e o desenho
    pata.className = 'pata';
    pata.textContent = '🐾';

    // 4. Colocar a pata onde o mouse clicou (posição na página, em px)
    pata.style.left = evento.pageX + 'px';
    pata.style.top = evento.pageY + 'px';

    // 5. Girar um pouco, um ângulo sorteado entre -30 e 30 graus
    const giro = Math.floor(Math.random() * 61) - 30;
    pata.style.setProperty('--giro', giro + 'deg');

    // 6. Colocar a pata dentro do <body>: agora ela aparece
    document.body.appendChild(pata);

    // 7. Depois de 1 segundo (o tempo da animação), apagar a pata
    setTimeout(function () {
        pata.remove();
    }, 1000);
});
```

---

## 3. Agenda online 📅

### O caminho dos dados

```text
NAVEGADOR (agenda.js)                    SERVIDOR (PHP)                     BANCO (PostgreSQL)
──────────────────────                   ──────────────                     ──────────────────
escolhe o dia ──fetch GET──────────────▶ horarios.php?data=2026-12-01 ──▶ SELECT ... WHERE data = :data
desenha os botões ◀── {"ocupados":["09:00"]} ◀──────────────────────────────┘

confirma ─────fetch POST (JSON)────────▶ agendar.php: confere ───────────▶ INSERT INTO agendamentos
mostra a mensagem ◀── {"ok":true} ou {"ok":false,"erro":"ocupado"} ◀──────┘
```

- **JSON** é o "idioma" que o JavaScript e o PHP usam para conversar: `json_encode` (PHP → texto), `resposta.json()` (texto → objeto no JS), `JSON.stringify` (objeto do JS → texto), `json_decode` (texto → array no PHP).
- **`fetch`** faz um pedido ao servidor **sem recarregar a página**. Como demora, usamos `await` (espera a resposta) dentro de uma função `async`.
- **`UNIQUE (data, horario)`** no banco é a garantia final: mesmo que duas pessoas cliquem ao mesmo tempo, o banco só aceita a primeira. O PHP recebe o erro `23505` e responde `"erro": "ocupado"`.
- O PHP **confere tudo de novo** (data no passado, horário fora da lista, e-mail inválido), porque o JavaScript roda no navegador e pode ser alterado pelo F12.

### Respostas do `js/agenda.js`

| Nº | Resposta | Por quê |
| --- | --- | --- |
| ① | `'#agenda-data'` | `#` = id, `.` = classe. Sem nada, procura uma **tag** chamada agenda-data. |
| ② | `'horarios.php?data='` | Quem **lê** os ocupados é o `horarios.php`; o `agendar.php` **grava**. |
| ③ | `await` | `async` marca a função; `await` espera o `fetch` terminar. |
| ④ | `json` | O PHP respondeu JSON; `.json()` transforma em objeto (`dados.ocupados`). |
| ⑤ | `includes` | `lista.includes(x)` responde `true`/`false`. `push` acrescenta, `join` junta em texto. |
| ⑥ | `true` | `disabled = true` desliga o botão. |
| ⑦ | `add` | `classList.add` acrescenta a classe; o CSS de `.horario.ocupado` deixa cinza e riscado. |
| ⑧ | `appendChild` | Coloca o botão criado dentro da caixa `#agenda-horarios`. |
| ⑨ | `'change'` | O campo de data dispara `change` quando o dia é escolhido. |
| ⑩ | `'submit'` | O formulário dispara `submit` ao clicar no botão `type="submit"`. |
| ⑪ | `preventDefault` | Sem ele o navegador recarregaria a página e o `fetch` seria cancelado. |
| ⑫ | `'POST'` | `GET` só pede dados; para **enviar** usamos `POST`. O `agendar.php` responde 405 para outro método. |
| ⑬ | `stringify` | `JSON.stringify` transforma objeto em texto; `JSON.parse` faz o contrário. |
| ⑭ | `dados.ok` | O PHP responde `{"ok": true}` quando gravou. |

```js
// agenda.js — agenda online da EducaCão.
// Caminho: o JavaScript pergunta ao horarios.php quais horários estão ocupados
// no banco, desenha os botões e envia o agendamento para o agendar.php.

// ---------- 1. PEGAR OS ELEMENTOS DO HTML ----------
const HORARIOS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const campoData = document.querySelector('#agenda-data');
const caixaHorarios = document.querySelector('#agenda-horarios');
const formAgenda = document.querySelector('#form-agenda');
const campoNome = document.querySelector('#agenda-nome');
const campoEmail = document.querySelector('#agenda-email');
const botao = document.querySelector('#agenda-botao');
const mensagem = document.querySelector('#agenda-mensagem');

let horarioEscolhido = null;

// Não deixa escolher um dia que já passou (data de hoje no formato 2026-12-01)
const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
campoData.min = hoje.toISOString().slice(0, 10);

// Mostra um texto embaixo do botão. tipo = 'info', 'sucesso' ou 'erro' (cores no CSS)
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = 'agenda-mensagem ' + tipo;
}

// Transforma 2026-12-01 em 01/12/2026
function dataBrasil(data) {
    return data.split('-').reverse().join('/');
}

// ---------- 2. BUSCAR NO BANCO OS HORÁRIOS OCUPADOS ----------
async function carregarHorarios() {
    horarioEscolhido = null;
    botao.disabled = true;

    if (!campoData.value) {
        return;
    }

    caixaHorarios.innerHTML = '<p class="agenda-vazio">Carregando horários...</p>';

    try {
        const resposta = await fetch('horarios.php?data=' + campoData.value);
        const dados = await resposta.json();
        desenharHorarios(dados.ocupados);
    } catch (erro) {
        caixaHorarios.innerHTML = '<p class="agenda-vazio">Não foi possível falar com o servidor. Abra pelo localhost:8000.</p>';
    }
}

// ---------- 3. DESENHAR UM BOTÃO PARA CADA HORÁRIO ----------
function desenharHorarios(ocupados) {
    caixaHorarios.innerHTML = '';

    HORARIOS.forEach(function (horario) {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'horario';
        item.textContent = horario;

        if (ocupados.includes(horario)) {
            item.disabled = true;
            item.classList.add('ocupado');
            item.title = 'Horário ocupado';
        }

        item.addEventListener('click', function () {
            escolherHorario(item);
        });

        caixaHorarios.appendChild(item);
    });
}

function escolherHorario(item) {
    caixaHorarios.querySelectorAll('.horario').forEach(function (outro) {
        outro.classList.remove('selecionado');
    });
    item.classList.add('selecionado');
    horarioEscolhido = item.textContent;
    botao.disabled = false;
    mostrarMensagem('Horário escolhido: ' + dataBrasil(campoData.value) + ' às ' + horarioEscolhido, 'info');
}

// Quando o dia muda, busca os horários de novo
campoData.addEventListener('change', carregarHorarios);

// ---------- 4. ENVIAR O AGENDAMENTO PARA O PHP ----------
formAgenda.addEventListener('submit', async function (evento) {
    evento.preventDefault();   // não recarrega a página: quem envia é o fetch

    const pedido = {
        nome: campoNome.value.trim(),
        email: campoEmail.value.trim(),
        data: campoData.value,
        horario: horarioEscolhido
    };

    if (pedido.nome === '' || pedido.email === '') {
        mostrarMensagem('Preencha seu nome e e-mail.', 'erro');
        return;
    }

    botao.disabled = true;

    try {
        const resposta = await fetch('agendar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
        const dados = await resposta.json();

        if (dados.ok) {
            mostrarMensagem('Agendado! ' + dataBrasil(pedido.data) + ' às ' + pedido.horario + '. Até lá! 🐶', 'sucesso');
            campoNome.value = '';
            campoEmail.value = '';
            carregarHorarios();
        } else if (dados.erro === 'ocupado') {
            mostrarMensagem('Esse horário acabou de ser ocupado. Escolha outro.', 'erro');
            carregarHorarios();
        } else {
            // dados.erros = lista dos campos errados, ex.: ["email"]
            mostrarMensagem('Confira: ' + (dados.erros || [dados.erro]).join(', '), 'erro');
            botao.disabled = false;
        }
    } catch (erro) {
        mostrarMensagem('Não foi possível agendar. O servidor do PHP está ligado?', 'erro');
        botao.disabled = false;
    }
});
```

### Respostas do `horarios.php`

`json` · `data` · `conexao.php` · `:data` · `json_encode`

```php
<?php
// horarios.php — responde em JSON quais horários de um dia já estão ocupados.
// Quem chama é o js/agenda.js: horarios.php?data=2026-12-01
// Resposta: {"ocupados": ["09:00", "14:00"]}

header('Content-Type: application/json; charset=utf-8');

$data = $_GET['data'] ?? '';

// A data tem que vir no formato do <input type="date">: 2026-12-01
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'erro' => 'data']);
    exit;
}

require __DIR__ . '/conexao.php';

// to_char deixa o horário como texto "09:00" (sem os segundos)
$sql = "SELECT to_char(horario, 'HH24:MI') FROM agendamentos
        WHERE data = :data ORDER BY horario";

$comando = $pdo->prepare($sql);
$comando->execute([':data' => $data]);

// fetchAll(PDO::FETCH_COLUMN) = só a lista de horários: ["09:00", "14:00"]
echo json_encode(['ocupados' => $comando->fetchAll(PDO::FETCH_COLUMN)]);
```

### Respostas do `agendar.php`

`POST` · `json_decode` · `horario` · `agendamentos` · `:nome`, `:email`, `:data`, `:horario` · `prepare` · `execute` · `ocupado` · `true`

```php
<?php
// agendar.php — recebe o agendamento do js/agenda.js (em JSON), confere e grava no banco.
// Responde em JSON: {"ok": true} ou {"ok": false, ...}

header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Sao_Paulo');

// ---------- 1. RECEBER ----------

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'erro' => 'metodo']);
    exit;
}

// O fetch manda JSON no corpo do pedido (não é $_POST): lemos e transformamos em array
$dados = json_decode(file_get_contents('php://input'), true) ?? [];

$nome    = trim($dados['nome'] ?? '');
$email   = trim($dados['email'] ?? '');
$data    = trim($dados['data'] ?? '');
$horario = trim($dados['horario'] ?? '');

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

$sql = 'INSERT INTO agendamentos (nome, email, data, horario)
        VALUES (:nome, :email, :data, :horario)';

try {
    $comando = $pdo->prepare($sql);
    $comando->execute([
        ':nome'    => $nome,
        ':email'   => $email,
        ':data'    => $data,
        ':horario' => $horario,
    ]);
} catch (PDOException $erro) {
    // 23505 = o banco recusou por causa do UNIQUE (data, horario): alguém pegou antes
    if ($erro->getCode() === '23505') {
        http_response_code(409);
        echo json_encode(['ok' => false, 'erro' => 'ocupado']);
        exit;
    }
    error_log('Erro ao agendar: ' . $erro->getMessage());
    http_response_code(500);
    echo json_encode(['ok' => false, 'erro' => 'banco']);
    exit;
}

echo json_encode(['ok' => true]);
```

### Respostas da PARTE 4 do `banco.sql`

`agendamentos` · `DATE` · `TIME` · `UNIQUE`

```sql
CREATE TABLE agendamentos (
    id         SERIAL PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    data       DATE NOT NULL,
    horario    TIME NOT NULL,
    criado_em  TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (data, horario)
);
```

---

## 4. Como investigar quando não funciona (F12)

| Aba | Para que serve |
| --- | --- |
| **Console** | Erros do JavaScript em vermelho, com arquivo e linha. Dá para testar: digite `document.querySelector('#agenda-data')` e aperte Enter. |
| **Network (Rede)** | Cada `fetch` aparece como uma linha. Clique em `horarios.php` ou `agendar.php`: **Payload** mostra o que o JS enviou e **Response** mostra o que o PHP respondeu. |
| **Elements** | Veja os botões de horário criados pelo JavaScript e as classes `selecionado` e `ocupado` mudando. |
| Terminal do `php -S` | Erros do PHP e do banco (o `error_log`) aparecem ali. |
