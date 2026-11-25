// patinhas.js — cada clique na página deixa uma pegada 🐾 que some sozinha.
// O visual (tamanho, animação) já está pronto no css/javascript.css (classe .pata).
//
// COMO FAZER: em cada ___ leia as opções A, B e C do comentário logo acima
// e digite o VALOR escolhido (não a letra). Salve (Ctrl + S) e clique na página.
// Abra o Console (F12 → Console) para ver se aparece algum erro em vermelho.

// 1. Ouvir o clique em QUALQUER lugar da página
//    Qual evento acontece quando a pessoa clica?
//    A) 'submit'    B) 'click'    C) 'change'
document.addEventListener(___, function (evento) {

    // 2. Criar um elemento novo: <span></span>
    //    Qual função CRIA um elemento?
    //    A) document.querySelector    B) document.createElement    C) document.getElementById
    const pata = ___('span');

    // 3. Dar a classe do CSS e o desenho
    //    Qual é o nome da classe que existe no css/javascript.css?
    //    A) 'pata'    B) '.pata'    C) 'patinha'
    pata.className = ___;
    pata.textContent = '🐾';

    // 4. Colocar a pata onde o mouse clicou (posição na página, em px)
    //    O evento guarda a posição do clique. Qual é a horizontal (esquerda → direita)?
    //    A) evento.pageY    B) evento.pageX    C) evento.target
    pata.style.left = ___ + 'px';
    pata.style.top = evento.pageY + 'px';

    // 5. Girar um pouco, um ângulo sorteado entre -30 e 30 graus
    //    Qual função sorteia um número entre 0 e 1?
    //    A) Math.round()    B) Math.random()    C) Math.floor()
    const giro = Math.floor(___ * 61) - 30;
    pata.style.setProperty('--giro', giro + 'deg');

    // 6. Colocar a pata dentro do <body>: só agora ela aparece na tela
    //    Qual função COLOCA um elemento dentro de outro?
    //    A) appendChild    B) remove    C) addEventListener
    document.body.___(pata);

    // 7. Depois de 1 segundo (o tempo da animação no CSS), apagar a pata
    //    Quantos milissegundos tem 1 segundo?
    //    A) 1    B) 100    C) 1000
    setTimeout(function () {
        pata.remove();
    }, ___);
});
