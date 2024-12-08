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

// Evento para tratar o envio dos dados do produto
document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionar = document.querySelector(".adicionarProd");

  btnAdicionar.addEventListener("click", async (e) => {
    e.preventDefault();

    // Captura dos dados dos formulários
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("tel").value;
    const data_nasc = document.getElementById("data_nasc").value;

    const produto = document.getElementById("produto").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const localizacao = document.getElementById("local").value;
    const valor = document.getElementById("valor").value;

    // Dados a serem enviados para a API
    const dadosProduto = {
      nome,
      email,
      telefone,
      data_nasc,
      produto,
      descricao,
      categoria,
      localizacao,
      valor,
    };

    try {
      const response = await fetch("/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProduto),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Produto cadastrado com sucesso!");
        console.log("Resposta da API:", data);
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao cadastrar produto. Verifique o console para mais informações.");
    }
  });
});

// Eventos para navegação manual do carrossel
document.querySelector('.anterior').addEventListener('click', () => moveSlide(-1));
document.querySelector('.proximo').addEventListener('click', () => moveSlide(1));

// Ao clicar no botão "Comprar", mostrará o telefone do vendedor
document.querySelectorAll('.botaoComprar').forEach(button => {
  button.addEventListener('click', () => {
    alert('Telefone do vendedor: (XX) XXXX-XXXX');
  });
});

document.getElementById('form-produto').addEventListener('submit', async function (e) {
  e.preventDefault(); // Previne o comportamento padrão de envio do formulário

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Enviar dados para o servidor
  try {
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Produto cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar produto: ' + result.error);
    }
  } catch (error) {
    console.error('Erro ao enviar dados para o servidor:', error);
  }
});
