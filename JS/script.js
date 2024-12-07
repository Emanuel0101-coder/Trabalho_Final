let slideIndex = 0;
const slides = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.ponto');
const slideInterval = 5000; 

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
        dots[i].classList.remove('active');
    });

    dots[slideIndex].classList.add('active');
}

function moveSlide(step) {
    showSlide(slideIndex += step);
}

function currentSlide(index) {
    showSlide(slideIndex = index);
}

setInterval(() => {
    moveSlide(1);
}, slideInterval);

showSlide(slideIndex);

document.querySelector('.anterior').addEventListener('click', () => moveSlide(-1));
document.querySelector('.proximo').addEventListener('click', () => moveSlide(1));

//Ao clicar no botão comprar, mostrará o telefone do vendedor

document.querySelectorAll('.botaoComprar').forEach(button => {
    button.addEventListener('click', () => {
        alert('Telefone do vendedor: (XX) XXXX-XXXX');
    });
});

document.getElementById('produto').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
  
    const response = await fetch('/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      alert('Produto cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar produto.');
    }
  });
  