// let slideIndex = 0;
// const slides = document.querySelectorAll('.item');
// const dots = document.querySelectorAll('.ponto');
// const slideInterval = 5000; // Intervalo de tempo para o slide automático (5 segundos)

// // Função para mostrar o slide atual
// function showSlide(index) {
//   if (index >= slides.length) slideIndex = 0;
//   if (index < 0) slideIndex = slides.length - 1;

//   slides.forEach((slide, i) => {
//     slide.style.transform = `translateX(-${slideIndex * 100}%)`;
//     dots[i].classList.remove('active');
//   });

//   dots[slideIndex].classList.add('active');
// }

// // Função para mover o slide
// function moveSlide(step) {
//   showSlide(slideIndex += step);
// }

// // Função para definir o slide atual
// function currentSlide(index) {
//   showSlide(slideIndex = index);
// }

// // Configura o intervalo para mudar os slides automaticamente
// setInterval(() => {
//   moveSlide(1);
// }, slideInterval);

// // Mostra o primeiro slide ao carregar a página
// showSlide(slideIndex);

// document.querySelector('.anterior').addEventListener('click', () => moveSlide(-1));
// document.querySelector('.proximo').addEventListener('click', () => moveSlide(1));

// //Ao clicar no botão comprar, mostrará o telefone do vendedor

// document.querySelectorAll('.botaoComprar').forEach(button => {
//     button.addEventListener('click', () => {
//         alert('Telefone do vendedor: (XX) XXXX-XXXX');
//     });
// });

// document.querySelectorAll('.botaoExcluir').forEach(button => {
//     button.addEventListener('click', () => {
//         alert('O produto foi excluído');
//     });
// });

// // Seleciona o formulário
// const form = document.getElementById("dadosProduto");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault(); // Evita o comportamento padrão de envio do formulário

//   const formData = new FormData(form); // Cria o FormData com todos os dados do formulário

//   try {
//     const response = await fetch('/api/produtos', {
//       method: 'POST',
//       body: formData // Envia os dados como FormData
//     });

//     const result = await response.json(); // Aguarda e obtém a resposta do servidor

//     if (response.ok) {
//       alert('Produto adicionado com sucesso!');
//       form.reset(); // Reseta o formulário após o envio
//     } else {
//       alert('Erro ao adicionar produto: ' + result.message);
//     }
//   } catch (error) {
//     console.error('Erro ao enviar o formulário:', error);
//     alert('Erro ao enviar os dados.');
//   }
// });
let slideIndex = 0;
const slides = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.ponto');
const slideInterval = 5000;

// Função para mostrar o slide atual
function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    if (dots[i]) dots[i].classList.remove('active');
  });

  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

// Função para mover o slide
function moveSlide(step) {
  showSlide(slideIndex += step);
}

// Mostra o primeiro slide ao carregar a página
showSlide(slideIndex);

document.querySelector('.anterior')?.addEventListener('click', () => moveSlide(-1));
document.querySelector('.proximo')?.addEventListener('click', () => moveSlide(1));

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
const form = document.getElementById("dadosProduto");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Produto adicionado com sucesso!');
      form.reset();
    } else {
      alert('Erro ao adicionar produto: ' + result.message);
    }
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    alert('Erro ao enviar os dados.');
  }
});

// Slide automático
setInterval(() => {
  moveSlide(1);
}, slideInterval);

document.getElementById('dadosProduto').addEventListener('submit', function(event) {
  event.preventDefault();  // Evita que o formulário seja enviado de forma tradicional

  // Captura os valores do formulário
  const produtoId = document.getElementById('produtoId').value;  // ID do produto
  console.log('Produto ID:', produtoId);
  const produto = document.getElementById('produto').value;
  const descricao = document.getElementById('descricao').value;
  const categoria = document.getElementById('categoria').value;
  const localizacao = document.getElementById('local').value;
  const valor = document.getElementById('valor').value;
  const imagemFile = document.getElementById('imagem').files[0];  // Assume que o usuário selecionou uma imagem

  // Cria o FormData com todos os dados
  const formData = new FormData();
  formData.append('produtoId', produtoId);  // Adiciona o ID do produto
  formData.append('produto', produto);
  formData.append('descricao', descricao);
  formData.append('categoria', categoria);
  formData.append('localizacao', localizacao);
  formData.append('valor', valor);
  formData.append('imagem', imagemFile);  // A imagem é enviada com o FileList

  // Envia os dados para o backend via fetch
  fetch('/api/produtos/editar', {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Produto atualizado:', data);
    // Aqui você pode adicionar um feedback para o usuário, como uma mensagem de sucesso.
  })
  .catch(error => console.error('Erro ao atualizar produto:', error));
});
