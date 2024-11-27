//Obter o botão da tela 1 pegando pelo id, usando o getElementById
const botaoMostrarTela1 = document.getElementById("mostrarTela1");
const tela1 = document.querySelector(".tela1");

//Adicionar o evento do botão
/* botaoMostrarTela1.addEventListener("click", function(){
    tela1.style.display = "block";                  //torna a tela 1 visivel
    botaoMostrarTela1.style.display = "none";       //esconde o botão 
}) */

//Carrossel
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const container = document.querySelector('.carrossel-container');
const slides = document.querySelectorAll('.carrossel-slide'); // Corrigido para pegar as imagens

let currentIndex = 0;

// Atualiza o carrossel
function updateCarousel(){
    const width = container.clientWidth; // Corrigido para acessar o clientWidth do container
    container.style.transform = `translateX(${-width * currentIndex}px)`;
}

// Ir para o slide anterior
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});

// Ir para o slide seguinte
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Inicializa o carrossel na primeira posição
updateCarousel();
