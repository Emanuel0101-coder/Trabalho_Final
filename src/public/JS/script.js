let slideIndex = 0;
const slides = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.ponto');
const slideInterval = 5000; // Intervalo de tempo para o slide automático (5 segundos)

// Função para mostrar o slide atual
function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots[i].classList.remove('active');
  });

  dots[slideIndex].classList.add('active');
}

// Função para mover o slide
function moveSlide(step) {
  showSlide(slideIndex += step);
}

// Função para definir o slide atual
function currentSlide(index) {
  showSlide(slideIndex = index);
}

// Configura o intervalo para mudar os slides automaticamente
setInterval(() => {
  moveSlide(1);
}, slideInterval);

// Mostra o primeiro slide ao carregar a página
showSlide(slideIndex);

document.querySelector('.anterior').addEventListener('click', () => moveSlide(-1));
document.querySelector('.proximo').addEventListener('click', () => moveSlide(1));

//Ao clicar no botão comprar, mostrará o telefone do vendedor

document.querySelectorAll('.botaoComprar').forEach(button => {
    button.addEventListener('click', () => {
        alert('Telefone do vendedor: (XX) XXXX-XXXX');
    });
});

document.querySelectorAll('.botaoExcluir').forEach(button => {
    button.addEventListener('click', () => {
        alert('O produto foi excluído');
    });
});
