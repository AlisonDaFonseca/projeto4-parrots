const  cardsBoard = document.querySelector('.container-cartas');
let jogadas = 0;

const imagens = [
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
];
let qtdCartas = Number(prompt('Digite a quantidade de cartas(número par e entre 4 e 14) : ')) / 2;


while((qtdCartas * 2) < 2 || (qtdCartas * 2) > 14 || (qtdCartas * 2) % 2 !== 0){
    qtdCartas = Number(prompt('Quantidade inválida! Digite novamente a quantidade de cartas: ')) / 2;
}


imagens.sort(comparador);

const listaCards = [];
const listaCards2 = [];
for(let i = 0; i < qtdCartas; i++){
    listaCards.push(imagens[i]);
    listaCards2.push(imagens[i]);
}

listaCards.sort(comparador);
listaCards2.sort(comparador);

createdCard();

function createdCard(){
    let listaCardsCompleta = [...listaCards, ...listaCards2];
    let lista1 ='';
   
    for(let i = 0; i < listaCardsCompleta.length; i++){
        lista1 += `
        <div onclick="virarCarta(this)" class="carta" data-imagem="${listaCardsCompleta[i]}">
            <div class="carta1 card-img">
                <img src="./img/back.png">
            </div>
            <div class="carta2 card-img back-face">
                <img src="./img/${listaCardsCompleta[i]}">
            </div>
        </div>
        
        ` 
    }
   cardsBoard.innerHTML = lista1;
}

function comparador(){
    return Math.random() - 0.5;
}
let firstCard = '';
let secondCard = '';

function checkEnd(){
    const checarFim = document.querySelectorAll('.acertou');

    if(checarFim.length === (qtdCartas*2)){
        setTimeout(() => {
            alert(`Você ganhou em ${jogadas} jogadas!`);
        }, 1000);
        
    }
}

function checkForMatch(){
    const firstCardRevelada = firstCard.dataset.imagem;
    const secondCardRevelada = secondCard.dataset.imagem;


    if(firstCardRevelada === secondCardRevelada){
        firstCard.removeAttribute("onclick");
        secondCard.removeAttribute("onclick");
        firstCard.classList.add("acertou");
        secondCard.classList.add("acertou");
        firstCard = '';
        secondCard = '';

        checkEnd();

    } else{
        setTimeout(() => {
            unFlip(firstCard);
            unFlip(secondCard);
            firstCard = '';
            secondCard = '';

        }, 1000);
        
    }
       
}

function unFlip(carta){
    const carta1 = carta.querySelector('.carta1');
    carta1.classList.remove('carta-frente');

    const carta2 = carta.querySelector('.carta2');
    carta2.classList.remove('carta-verso'); 
}
function virarCarta(carta){
    if(firstCard === ''){
        const carta1 = carta.querySelector('.carta1');
        carta1.classList.add('carta-frente');
    
        const carta2 = carta.querySelector('.carta2');
        carta2.classList.add('carta-verso'); 
        
        firstCard = carta;
        jogadas++;
    } else if(secondCard === ''){
        const carta1 = carta.querySelector('.carta1');
        carta1.classList.add('carta-frente');
    
        const carta2 = carta.querySelector('.carta2');
        carta2.classList.add('carta-verso'); 

        secondCard = carta;
        jogadas++;
        checkForMatch();
    }
    
}

