# 🐾 Atividade 03 · 3º ano · EducaCão: PHP, banco de dados e JavaScript

> 📅 **Prazo de entrega: de 30/11 a 04/12.** Trabalhos entregues depois de 04/12 não serão aceitos.

O **HTML e o CSS já vêm prontos** (a landing page da EducaCão igual ao `modelo.pdf`). O foco do 3º ano é **dar vida ao site**: ligar o formulário ao banco com **PHP** e criar uma **agenda online** com **JavaScript** que conversa com o banco.

## ⚠️ O que você precisa fazer

| Parte | Arquivos | Como completar |
| --- | --- | --- |
| **1 · Banco** | `banco/banco.sql`, `config.php` | Complete os `___` (linha **DICA** acima de cada um) e rode no Beekeeper. |
| **2 · PHP do Contato** | `conexao.php`, `salvar.php` | Complete os `___` com a ajuda das linhas **DICA**. |
| **3 · JavaScript** | `js/patinhas.js`, `horarios.php`, `agendar.php`, `js/agenda.js` | No PHP: linhas **DICA**. No JavaScript: escolha **A, B ou C** e digite o valor. |
| Pronto (não mexer) | `index.html`, `css/`, `testar_conexao.php`, `config.exemplo.php` | Só personalize no final (seção 🎨). |

**PASSO 1:** Clique no botão verde **Code** → **Download ZIP**.

**PASSO 2:** Extraia o ZIP (botão direito → **Extrair tudo**) dentro da sua pasta.

**PASSO 3:** No **VS Code**: **Arquivo → Abrir Pasta** e escolha a pasta extraída (a que tem `index.html`, `css`, `js`, `img`).

**PASSO 4:** Siga as **Partes 1, 2 e 3** abaixo, nessa ordem.

---

## 📘 Versão com explicação (para tirar dúvidas)

Na pasta **`explicacao/`** está a **versão com explicação** para você entender cada parte:

- **`Explicacao_JavaScript.pdf`**: **guia passo a passo do JavaScript** (para acompanhar em casa ou se não houver apresentação): o que precisa instalar, como usar o F12 (Console e Network), e as duas funções separadas por parte: **🐾 Patinhas** e **📅 Agenda online**, com prints marcados de onde mexer, o código de cada passo e desenhos explicando como funciona na prática.
- **`Explicacao_JavaScript.md`**: o mesmo conteúdo em texto, com as respostas de cada lacuna e o porquê.
- **`Explicacao_PHP_Banco_de_Dados.pdf`**: passo a passo com prints, da instalação do PHP até o formulário gravando no banco.
- **`Explicacao_HTML_CSS.pdf`**: como a página foi montada (o HTML e o CSS já vêm prontos para você).

Elas mostram as respostas, mas o objetivo é **entender**: tente primeiro, use quando travar e confira o porquê de cada valor. A pasta `explicacao/` não precisa ir para o seu repositório de entrega.

## 📁 Estrutura do projeto

```text
Atividade-03-3-ano/
├── index.html              ← PRONTO (já tem a seção da agenda e os <script>)
├── modelo.pdf              ← referência visual
├── README.md / LEIA-ME.txt ← instruções
├── explicacao/             ← versão com explicação (para tirar dúvidas)
├── css/
│   ├── base.css            ← PRONTO
│   ├── style.css           ← PRONTO (a página igual ao modelo)
│   └── javascript.css      ← PRONTO (visual das patinhas e da agenda)
├── banco/
│   └── banco.sql           ← complete os ___ (Partes 1 a 4)
├── config.exemplo.php      ← PRONTO: copie para config.php e coloque a senha
├── conexao.php             ← complete os ___ (abre a conexão)
├── salvar.php              ← complete os ___ (formulário de Contato)
├── testar_conexao.php      ← PRONTO: mostra "Conexão OK!"
├── horarios.php            ← complete os ___ (devolve os horários ocupados em JSON)
├── agendar.php             ← complete os ___ (grava o agendamento)
├── js/
│   ├── patinhas.js         ← complete os ___ (alternativas A, B, C)
│   └── agenda.js           ← complete os ___ (alternativas A, B, C)
├── .gitignore              ← impede o config.php de ir para o GitHub
└── img/                    ← fotos do site (inclui sobre.jpg e os cães dos clientes)
```

> 📷 **Fotos:** a foto da seção Sobre (`img/sobre.jpg`) e as fotos dos depoimentos (`img/cliente-luna.jpg`, `cliente-thor.jpg`, `cliente-max.jpg`, o cão de cada cliente fictício) são fotos de uso livre do **Pexels** (pexels.com). Os clientes e os depoimentos continuam **fictícios**.

---

## 🐘 Parte 1 · Preparar o PHP e o banco

No laboratório o **PostgreSQL** e o **Beekeeper Studio** já estão instalados. O **PHP** você instala no passo 1.1.

### 1.1 Instalar o PHP (Windows)

1. Baixe o PHP em **windows.php.net/download** → versão **VS17 x64 Non Thread Safe**, arquivo **Zip**.
2. Extraia em uma pasta, por exemplo `C:\php` (ou `Downloads\php`, se não puder usar o `C:\`).
3. Dentro dessa pasta, copie `php.ini-development` e renomeie a cópia para **`php.ini`**.
4. Abra o `php.ini` no VS Code e, com **Ctrl + F**, deixe estas linhas assim (tire o `;` do começo):
   ```ini
   extension_dir = "ext"
   extension=pdo_pgsql
   extension=pgsql
   extension=mbstring
   ```
   Se der erro de extensão não encontrada, troque `"ext"` pelo caminho completo, ex.: `"C:\php\ext"`.
5. Teste no terminal do VS Code: `C:\php\php.exe -v` (use o caminho da sua pasta). Tem que aparecer `PHP 8...`.

> Se o comando `php` sozinho der **"não é reconhecido"**, é porque o PHP não está no PATH do Windows. Sem problema: use sempre o caminho completo, como `& "C:\php\php.exe" -S localhost:8000`.

### 1.2 Criar o banco no Beekeeper (`banco/banco.sql`)

1. Complete os `___` do `banco/banco.sql`.
2. No Beekeeper, conecte no PostgreSQL (`localhost`, porta `5432`, usuário `postgres` e a senha do laboratório).
3. Rode **uma parte por vez**: selecione o trecho com o mouse e aperte **Ctrl + Enter**.
   - **Parte 1** (conectado no banco `postgres`): cria o banco `educacao`.
   - **Troque para o banco `educacao`** (seletor de banco no topo do Beekeeper) antes da Parte 2.
   - **Parte 2**: cria a tabela `contatos`. **Parte 3**: grava uma linha de teste e mostra com `SELECT`.
   - **Parte 4**: cria a tabela `agendamentos` (da agenda online). Pode deixar para fazer na Parte 3 deste README.

### 1.3 Criar o `config.php` (a senha fica só nele)

1. Copie o `config.exemplo.php` e renomeie a **cópia** para **`config.php`**.
2. No `config.php`, troque `SUA_SENHA_AQUI` pela senha do PostgreSQL.
3. O `.gitignore` já tem a linha `config.php`: **a senha nunca vai para o GitHub**. Não apague o `.gitignore`.

### 1.4 Ligar o servidor do PHP

O **Live Server não executa PHP** (e o `fetch` do JavaScript precisa do PHP). No VS Code abra **Terminal → New Terminal** (na pasta do projeto) e rode:

```powershell
& "C:\php\php.exe" -S localhost:8000
```

Deixe esse terminal **aberto** o tempo todo e use sempre **`http://localhost:8000/...`** no navegador.

---

## 📨 Parte 2 · Formulário de Contato gravando no banco

```text
formulário (index.html) → salvar.php → conexao.php (usa o config.php) → PostgreSQL (tabela contatos)
```

1. Complete os `___` do `conexao.php` e do `salvar.php`. Quase tudo está no `index.html`: **Ctrl + F** em `name="` e `value="`.
2. Abra `http://localhost:8000/testar_conexao.php` → tem que aparecer **Conexão OK!** e as tabelas encontradas.
3. Abra `http://localhost:8000/index.html`, preencha o **Contato** e envie. Faça os testes:

| Teste | O endereço volta terminando em | Grava no banco? |
| --- | --- | --- |
| Tudo preenchido certo | `?enviado=1#contato` | sim |
| Tudo vazio | `?erro=nome,email,servico,mensagem#contato` | não |
| F12: mude o `value` de uma `<option>` para outro texto e envie | `?erro=servico#contato` | não |
| Nome: `Robert'); DROP TABLE contatos;--` | `?enviado=1#contato` | grava como texto; a tabela continua lá |
| Abrir `localhost:8000/salvar.php` direto | `index.html#contato` | não |

Confira no Beekeeper (banco `educacao`): `SELECT * FROM contatos ORDER BY id;`

---

## ⚡ Parte 3 · JavaScript

No JavaScript cada `___` tem **3 alternativas** no comentário de cima. Leia, pense no que cada uma faz e **digite o valor** (não a letra):

```js
//    Qual evento acontece quando a pessoa clica?
//    A) 'submit'    B) 'click'    C) 'change'
document.addEventListener(___, function (evento) {        // ANTES
document.addEventListener('click', function (evento) {    // DEPOIS (escolheu B)
```

> 🔍 **F12 → Console** mostra os erros do JavaScript em vermelho (com o arquivo e a linha). Enquanto ainda houver `___`, vai aparecer `___ is not defined`: é normal, é a lacuna que falta.

> 📘 Travou? Abra o **`explicacao/Explicacao_JavaScript.pdf`**: cada passo tem print, código marcado e desenho explicando.

### 3.1 Aquecimento: patinhas 🐾 (`js/patinhas.js`)

Cada clique na página deixa uma pegada de cachorro que sobe e some. São **7 lacunas**: ouvir o clique, criar o elemento, posicionar no mouse, sortear o giro, colocar na página e apagar depois de 1 segundo.

✅ **Pronto quando:** clicar em qualquer lugar da página faz aparecer uma 🐾 que some sozinha.

### 3.2 Agenda online 📅 (horários vindos do banco)

A seção **Agende uma visita** (já pronta no HTML e no CSS) funciona assim:

```text
1. escolhe o dia    →  agenda.js faz fetch('horarios.php?data=2026-12-01')
                    →  horarios.php faz SELECT na tabela agendamentos
                    →  responde JSON: {"ocupados": ["09:00", "14:00"]}
                    →  agenda.js desenha os 8 botões e bloqueia os ocupados
2. escolhe o horário e preenche nome e e-mail
3. confirma         →  agenda.js faz fetch('agendar.php', POST com JSON)
                    →  agendar.php confere e faz INSERT
                    →  responde {"ok": true}  ou  {"ok": false, "erro": "ocupado"}
                    →  agenda.js mostra a mensagem e atualiza os horários
```

Faça nesta ordem:

1. **Banco:** complete e rode a **PARTE 4** do `banco/banco.sql` (tabela `agendamentos`, no banco `educacao`).
2. **`horarios.php`** (5 lacunas, linhas **DICA**). Teste direto no navegador: `http://localhost:8000/horarios.php?data=2026-12-01` → tem que aparecer `{"ocupados":[]}`.
3. **`agendar.php`** (12 lacunas, linhas **DICA**). Ele recebe JSON do JavaScript e responde JSON.
4. **`js/agenda.js`** (14 lacunas, alternativas **A, B, C**), na ordem: ① elementos → ②③④ buscar no banco → ⑤–⑨ desenhar os botões → ⑩–⑭ enviar.

Faça os testes:

| Teste | O que tem que acontecer |
| --- | --- |
| Escolher um dia | Aparecem 8 botões de horário (08:00 a 17:00). |
| Clicar num horário | O botão fica laranja, o **Confirmar agendamento** é liberado e aparece "Horário escolhido". |
| Confirmar com nome e e-mail | Mensagem verde **Agendado!** e o horário fica **cinza e riscado**. |
| Atualizar a página (F5) e escolher o mesmo dia | O horário agendado **continua** ocupado: veio do banco. |
| Abra a página em **duas abas**, escolha o **mesmo** horário nas duas; confirme numa aba e depois na outra | O segundo recebe "Esse horário acabou de ser ocupado" (o `UNIQUE` do banco barrou). |
| Confirmar com e-mail errado (ex.: `ana@`) | Mensagem vermelha "Confira: email". |
| Dias que já passaram | O calendário não deixa escolher. |

Confira no Beekeeper: `SELECT * FROM agendamentos ORDER BY data, horario;`

> 🔍 **F12 → Network (Rede)** mostra cada pedido do `fetch`: clique em `horarios.php` ou `agendar.php` e veja a aba **Response** (a resposta em JSON que o PHP mandou).

### 🔧 Se der erro no JavaScript

| O que aparece | O que fazer |
| --- | --- |
| Console: `___ is not defined` | Ainda tem lacuna sem completar na linha indicada. |
| Console: `Cannot read properties of null` | O `querySelector` não achou o elemento: confira o `#` e o id. |
| "Não foi possível falar com o servidor" | Abra pelo `http://localhost:8000/index.html` (não pelo Live Server) e confira se o `php -S` está ligado. |
| Console: `Unexpected token '<'` ou `... is not valid JSON` | O PHP mostrou um erro em vez de JSON: abra o `horarios.php?data=2026-12-01` direto no navegador e leia o erro. |
| Os horários aparecem, mas nunca ficam ocupados | Confira a PARTE 4 do `banco.sql` e o `WHERE` do `horarios.php`. |
| Clicar em Confirmar recarrega a página | Falta o `preventDefault()` (lacuna ⑪). |

### 🔧 Se der erro no PHP ou no banco

| O que aparece | O que fazer |
| --- | --- |
| `'php' não é reconhecido` | Use o caminho completo: `& "C:\php\php.exe" -S localhost:8000`. |
| `could not find driver` | No `php.ini`, tire o `;` de `extension=pdo_pgsql` e `extension=pgsql` e reinicie o `php -S`. |
| `Não foi possível conectar ao banco de dados.` | Confira senha, banco (`educacao`) e porta no `config.php`. O detalhe do erro aparece no terminal do `php -S`. |
| `Failed opening required ... config.php` | Falta criar o `config.php` (copie o `config.exemplo.php`). |
| A página baixa o arquivo `.php` ou mostra o código | Você abriu pelo Live Server. Use `http://localhost:8000/...`. |
| `A tabela contatos não existe` | Rode a Parte 2 do `banco.sql` **no banco `educacao`**. |
| Volta com `?erro=banco` | A tabela recusou os dados: confira se os nomes das colunas e os valores do `CHECK` estão iguais aos do formulário. |

## 🎨 Personalização

O HTML e o CSS já vêm prontos e iguais ao `modelo.pdf`. Depois que o PHP e o JavaScript funcionarem, você pode deixar com a sua cara:

| Pode mudar ✅ | Não pode mudar ❌ |
| --- | --- |
| Os **valores das cores** no `:root` (`--green`, `--orange`, `--cream`...) | A estrutura do HTML: tags, classes, IDs e a ordem das seções |
| As **imagens** da pasta `img/` (mesmo nome do arquivo, ou ajuste o `src`) | Os `display`, `grid`, `flex` e tamanhos que montam o layout |
| Os **textos** (nome da empresa, serviços, depoimentos), mantendo o tema | Os blocos `@media` (a versão celular tem que continuar funcionando) |
| O texto alternativo `alt` das imagens novas | Os arquivos `base.css` e a ordem dos `<link>` no `<head>` |
| | Os `name` do formulário e os `value` do `<select>` (o PHP e o banco usam esses nomes) |
| | Os `id` da agenda (`agenda-data`, `agenda-horarios`, `form-agenda`...): o JavaScript procura por eles |

O resultado final tem que continuar **parecido com a landing page do modelo**: menu, banner, três serviços, Sobre, diferenciais, depoimentos, agenda, contato e rodapé, na mesma organização.

## 🏠 Faltou à aula ou é aluno do RAD (atividade em casa)?

Se você **não compareceu à aula** (por qualquer motivo) ou é **aluno do RAD** e faz a atividade em casa:

1. **Finalize a atividade em casa**, seguindo este README (e os PDFs da pasta `explicacao/`, se tiver dúvida).
2. **Publique no seu repositório do GitHub** (veja "Como postar no GitHub e me avisar", logo abaixo).
3. **Envie o link do seu repositório** para o professor: pela **Issue** neste repositório e/ou pelo **WhatsApp**.

### 🎥 Não mostrou o projeto pronto no laboratório? Grave um vídeo

Se o seu projeto **não foi apresentado funcionando no laboratório**, grave um **vídeo da tela** e envie junto com o link do repositório:

- No começo do vídeo, **diga em voz alta: seu nome completo, a disciplina e a sua turma**.
- Mostre **o que você fez**: abra os arquivos no VS Code e passe pelas partes que completou.
- Mostre **o resultado final** funcionando no navegador, do topo ao rodapé da página.
- Duração sugerida: de **2 a 5 minutos**.
- Para gravar a tela no Windows: **Windows + Alt + R** (Xbox Game Bar) ou a **Ferramenta de Captura** (Windows + Shift + S → ícone de vídeo). No celular, o gravador de tela também serve.
- Envie o vídeo pelo **WhatsApp** ou coloque o link do vídeo (Google Drive, YouTube não listado) na Issue.

## ✅ Entrega

📅 **Entregar entre 30/11 e 04/12.**

Publique o trabalho no **seu repositório do GitHub** com:

- [ ] `banco/banco.sql`, `conexao.php`, `salvar.php`, `horarios.php`, `agendar.php`, `js/patinhas.js` e `js/agenda.js` **sem nenhum `___`**;
- [ ] `testar_conexao.php` mostrando **Conexão OK!** e as duas tabelas;
- [ ] os testes do **Contato** e da **Agenda** funcionando;
- [ ] as **patinhas** aparecendo ao clicar;
- [ ] capturas de tela: a agenda com um horário ocupado e o Beekeeper com `SELECT * FROM agendamentos`;
- [ ] **sem** o `config.php` no GitHub (só o `config.exemplo.php`).

### 📤 Como postar no GitHub e me avisar

**1. Crie o seu repositório**
1. Entre na sua conta do GitHub e clique em **+** (canto superior direito) → **New repository**.
2. Nome sugerido: `atividade-03-educacao-SEU-NOME`. Marque **Public** e clique em **Create repository**.

**2. Envie a pasta do projeto**
1. No repositório novo, clique em **uploading an existing file** (ou **Add file → Upload files**).
2. Abra a pasta do projeto no computador, selecione **tudo o que está dentro dela** (`index.html`, `css`, `js`, `banco`, `img`, ...) e **arraste** para a página do GitHub.
3. Confira se as pastas `css`, `js`, `banco` e `img` apareceram na lista e clique em **Commit changes**.
4. **Não envie o `config.php`** (ele tem a senha). O `config.exemplo.php` pode ir.

**3. Me avise abrindo uma Issue (eu recebo notificação)**
1. Abra: **https://github.com/eduardo97mendes/Atividade-03-3-ano/issues/new**
2. **Título:** `Entrega Atividade 03 - Seu Nome Completo - 3º ano`.
3. **Texto:** cole o **link do seu repositório**, escreva **@eduardo97mendes** e, se quiser, arraste uma captura de tela da página pronta.
4. Clique em **Submit new issue** (ou **Create**).

> Escrever `@eduardo97mendes` **dentro da Issue** faz chegar uma notificação para mim. Escrever o @ só no README do seu repositório **não** notifica. Se não conseguir abrir a Issue, mande o link do seu repositório pelo canal da turma.


