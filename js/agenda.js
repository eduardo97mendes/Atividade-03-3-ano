// agenda.js — agenda online da EducaCão.
// Caminho: o JavaScript pergunta ao horarios.php quais horários estão ocupados
// no banco, desenha os botões e envia o agendamento para o agendar.php.
//
// COMO FAZER: em cada ___ leia as opções A, B e C do comentário logo acima
// e digite o VALOR escolhido (não a letra). Faça na ordem: 1 → 2 → 3 → 4.
// Teste SEMPRE pelo http://localhost:8000/index.html (o fetch precisa do PHP ligado).
// F12 → Console mostra erros do JavaScript; F12 → Network mostra os pedidos ao PHP.

// ---------- 1. PEGAR OS ELEMENTOS DO HTML ----------
const HORARIOS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

// ①  Como o querySelector acha um elemento pelo id="agenda-data"?
//    A) 'agenda-data'    B) '.agenda-data'    C) '#agenda-data'
const campoData = document.querySelector(___);
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
        // ②  Qual arquivo PHP responde os horários ocupados de um dia?
        //    A) 'agendar.php?data='    B) 'horarios.php?data='    C) 'horarios.html?data='
        // ③  O fetch demora (vai até o servidor). Qual palavra ESPERA a resposta chegar?
        //    A) await    B) async    C) return
        const resposta = ___ fetch(___ + campoData.value);
        // ④  O PHP respondeu em JSON. Qual função transforma a resposta em objeto?
        //    A) resposta.text()    B) resposta.json()    C) resposta.html()
        const dados = await resposta.___();
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

        // ⑤  Qual função confere se o horário ESTÁ na lista de ocupados?
        //    A) includes    B) push    C) join
        if (ocupados.___(horario)) {
            // ⑥  Botão ocupado não pode ser clicado: disabled recebe...
            //    A) false    B) 'ocupado'    C) true
            item.disabled = ___;
            // ⑦  Qual função ACRESCENTA a classe ocupado (cinza e riscado no CSS)?
            //    A) add    B) remove    C) contains
            item.classList.___('ocupado');
            item.title = 'Horário ocupado';
        }

        item.addEventListener('click', function () {
            escolherHorario(item);
        });

        // ⑧  Qual função coloca o botão dentro da caixa de horários?
        //    A) appendChild    B) createElement    C) querySelector
        caixaHorarios.___(item);
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
// ⑨  Qual evento acontece quando o valor do campo de data MUDA?
//    A) 'submit'    B) 'change'    C) 'keydown'
campoData.addEventListener(___, carregarHorarios);

// ---------- 4. ENVIAR O AGENDAMENTO PARA O PHP ----------
// ⑩  Qual evento acontece quando o formulário é ENVIADO?
//    A) 'click'    B) 'change'    C) 'submit'
formAgenda.addEventListener(___, async function (evento) {
    // ⑪  Qual função IMPEDE a página de recarregar (quem envia é o fetch)?
    //    A) evento.preventDefault()    B) evento.remove()    C) evento.reset()
    evento.___();

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
            // ⑫  Para ENVIAR dados ao PHP o método é... (o agendar.php só aceita este)
            //    A) 'GET'    B) 'POST'    C) 'DELETE'
            method: ___,
            headers: { 'Content-Type': 'application/json' },
            // ⑬  Qual função transforma o objeto pedido em TEXTO JSON?
            //    A) JSON.parse    B) JSON.stringify    C) String.json
            body: JSON.___(pedido)
        });
        const dados = await resposta.json();

        // ⑭  O agendar.php responde {"ok": true} quando gravou. Qual propriedade conferir?
        //    A) dados.ok    B) dados.erro    C) dados.horario
        if (___) {
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
