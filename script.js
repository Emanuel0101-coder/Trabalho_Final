//Obter o botão da tela 1 pegando pelo id, usando o getElementById
const botaoMostrarTela1 = document.getElementById("mostrarTela1");
const tela1 = document.querySelector(".tela1");

//Adicionar o evento do botão
botaoMostrarTela1.addEventListener("click", function(){
    tela1.style.display = "block";                  //torna a tela 1 visivel
    botaoMostrarTela1.style.display = "none";       //esconde o botão 
})

//Carrossel
let indiceAtual = 0; //Índice de slide atual
const slides = document.querySelectorAll('.carrossel-slide'); //pega por id e seleciona tudo
const totalSlides = slides.length;      //Total de slides

//Exibe a slide atual
function exibirSlide(indice) {
    if (indice >= totalSlides) {
        indice = 0;
    } else if (indice < 0){
        indice = totalSlides - 1;
    }
    indiceAtual = indice;
    const offset = indiceAtual * 100;
    document.querySelector('.carrossel-container').style.transform = `translateX(${offset}%)`;      
}

//avança para o proximo slide
function proximaSlide() {
    indiceAtual ++;                 //vai aumentar o indice
    exibirSlide(indiceAtual);
}

//volta para o slide anterior
function slideAnterior() {
    indiceAtual --;                 //vai diminuir o indice
    exibirSlide(indiceAtual);
}

//Eventos do Carrossel
document.querySelector('.next').addEventListener('click', proximaSlide);
document.querySelector('.prev').addEventListener('click',slideAnterior);