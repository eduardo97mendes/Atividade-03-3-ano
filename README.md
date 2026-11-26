# 🐾 Atividade 03 · 3º ano · EducaCão: PHP, banco de dados e JavaScript

> 📅 **Prazo de entrega: de 30/11 a 04/12.** Trabalhos entregues depois de 04/12 não serão aceitos.

O **HTML e o CSS já vêm prontos**. O seu trabalho é **dar vida ao site**: ligar o formulário de Contato ao banco com **PHP** e criar, com **JavaScript**, as patinhas e uma **agenda online** que conversa com o banco.

## 📘 Siga os PDFs da pasta `explicacao/`, na ordem

**Todo o passo a passo está nos PDFs**, com prints marcando onde clicar e o que preencher. Leia e faça **na ordem**:

| Ordem | Arquivo | O que você faz |
| --- | --- | --- |
| 1 | **`explicacao/1_HTML_e_CSS_pronto_consulta.pdf`** | **Nada para fazer.** O HTML e o CSS já vêm prontos: use só para tirar dúvida. |
| 2 | **`explicacao/2_PHP_e_Banco_de_Dados.pdf`** | Instalar o PHP, criar o banco no Beekeeper (PARTES 1 a 3 do `banco.sql`), criar o `config.php` e completar `conexao.php` e `salvar.php`. |
| 3 | **`explicacao/3_JavaScript_Patinhas_e_Agenda.pdf`** | Completar `js/patinhas.js`, a PARTE 4 do `banco.sql`, `horarios.php`, `agendar.php` e `js/agenda.js`, e testar tudo. |

> Cada PDF começa com o mapa **"Seu caminho"**, que mostra em que passo você está. No fim de cada um há uma página **"Se der erro"**.
> O arquivo `explicacao/3_JavaScript_respostas.md` tem a explicação de cada lacuna em texto. Tente primeiro e use quando travar.

## 🚀 Para começar

1. Clique no botão verde **Code** → **Download ZIP**.
2. Extraia o ZIP (botão direito → **Extrair tudo**).
3. No **VS Code**: **File → Open Folder** e escolha a pasta extraída (a que tem `index.html`, `css`, `js`, `img`).
4. Abra o **PDF 2** e siga o passo a passo.

**Como completar as lacunas `___`:**
- **PHP e SQL:** a linha **DICA** logo acima diz onde achar a resposta.
- **JavaScript:** o comentário de cima tem as opções **A, B e C**. Digite o **valor**, não a letra.

> ⚠️ A senha do banco fica só no `config.php`, que **nunca vai para o GitHub**. Não apague o arquivo `.gitignore`.

## 🎨 Personalização (opcional, no final)

Você pode trocar **cores** (no `:root`), **imagens** e **textos**. **Não mude a estrutura**: tags, classes, IDs, os `name` do formulário e os `id` da agenda. O resultado tem que continuar parecido com o `modelo.pdf`.

## ✅ Entrega · de 30/11 a 04/12

Publique no **seu repositório do GitHub**:

- [ ] nenhum `___` sobrando nos arquivos `.sql`, `.php` e `.js`;
- [ ] o formulário de Contato gravando no banco, as patinhas aparecendo ao clicar e a agenda funcionando;
- [ ] prints da agenda com um horário ocupado e do Beekeeper com `SELECT * FROM agendamentos`;
- [ ] **sem** o `config.php` (só o `config.exemplo.php`).

### 📤 Como postar e me avisar

1. No GitHub, clique em **+** → **New repository**, nome `atividade-03-educacao-SEU-NOME`, **Public** → **Create repository**.
2. Clique em **uploading an existing file**, arraste **tudo o que está dentro da pasta do projeto** e clique em **Commit changes**.
3. Abra **https://github.com/eduardo97mendes/Atividade-03-3-ano/issues/new** e preencha:
   - **Título:** `Entrega Atividade 03 - Seu Nome Completo - 3º ano`
   - **Texto:** o **link do seu repositório** e **@eduardo97mendes** (assim eu recebo a notificação).
4. Clique em **Submit new issue**.

> Não conseguiu abrir a Issue? Me envie o **link do seu repositório pelo WhatsApp**.

## 🏠 Faltou à aula ou é aluno do RAD?

- **Termine em casa** seguindo os PDFs, publique no seu GitHub e envie o **link do repositório** pela **Issue** e/ou pelo **WhatsApp**.
- Se o projeto **não foi mostrado funcionando no laboratório**, grave um **vídeo da tela** (2 a 5 minutos):
  - no começo, diga **seu nome completo, a disciplina e a turma**;
  - mostre **o que você fez** nos arquivos e **o site funcionando**, do topo ao rodapé.
  - Para gravar: **Windows + Alt + R**, ou **Windows + Shift + S** e o ícone de vídeo. O gravador de tela do celular também serve.
  - Envie o vídeo pelo **WhatsApp** ou coloque o link (Google Drive ou YouTube não listado) na Issue.
