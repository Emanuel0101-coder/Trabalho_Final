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

// Função para atualizar o carrossel
function updateCarousel() {
    const width = container.clientWidth; // Acesso ao clientWidth do container
    container.style.transform = `translateX(${-width * currentIndex}px)`; // Aplica o movimento horizontal
}

// Ir para o slide anterior
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
    resetAutoMove(); // Reinicia o movimento automático após interação
});

// Ir para o slide seguinte
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
    resetAutoMove(); // Reinicia o movimento automático após interação
});

// Movimento automático do carrossel a cada 3 segundos
let autoMoveInterval = setInterval(nextSlide, 3000); // Muda para o próximo slide a cada 3 segundos

// Função para avançar automaticamente para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}

// Função para reiniciar o movimento automático
function resetAutoMove() {
    clearInterval(autoMoveInterval); // Para o movimento automático atual
    autoMoveInterval = setInterval(nextSlide, 3000); // Reinicia o intervalo de 3 segundos
}

// Inicializa o carrossel na primeira posição
updateCarousel();

