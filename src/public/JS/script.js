let slideIndex = 0;
const slides = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.ponto');
const slideInterval = 5000;


function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    if (dots[i]) dots[i].classList.remove('active');
  });

  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function moveSlide(step) {
  showSlide(slideIndex += step);
}

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

setInterval(() => {
  moveSlide(1);
}, slideInterval);

document.getElementById('dadosProduto').addEventListener('submit', function(event) {
  event.preventDefault();  


  const produtoId = document.getElementById('produtoId').value;  
  console.log('Produto ID:', produtoId);
  const produto = document.getElementById('produto').value;
  const descricao = document.getElementById('descricao').value;
  const categoria = document.getElementById('categoria').value;
  const localizacao = document.getElementById('local').value;
  const valor = document.getElementById('valor').value;
  const imagemFile = document.getElementById('imagem').files[0]; 

  const formData = new FormData();
  formData.append('produtoId', produtoId);  
  formData.append('produto', produto);
  formData.append('descricao', descricao);
  formData.append('categoria', categoria);
  formData.append('localizacao', localizacao);
  formData.append('valor', valor);
  formData.append('imagem', imagemFile); 

  fetch('/api/produtos/editar', {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Produto atualizado:', data);
  })
  .catch(error => console.error('Erro ao atualizar produto:', error));
});
document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionar = document.querySelector(".adicionarProd");

  btnAdicionar.addEventListener("click", async (e) => {
    e.preventDefault();
    const produto = document.getElementById("produto").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const localizacao = document.getElementById("local").value;
    const valor = document.getElementById("valor").value;

    const dadosProduto = {
      produto,
      descricao,
      categoria,
      localizacao,
      valor,
    };

    try {
      console.log("Enviando dados do produto:", dadosProduto);
      const response = await fetch("http://localhost:3000/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProduto),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Produto cadastrado com sucesso!");

        adicionarProdutoNaLista(data);

        // Limpa o formulário
        document.getElementById("dadosProduto").reset();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao cadastrar produto. Verifique o console para mais informações.");
    }
  });

  function adicionarProdutoNaLista(produto) {
    const listaProdutos = document.getElementById("listaProdutos");
    
    const produtoElement = document.createElement("div");
    produtoElement.classList.add("produto");

    produtoElement.innerHTML = `
      <h3>${produto.produto}</h3>
      <p>${produto.descricao}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
      <p><strong>Valor:</strong> R$ ${produto.valor}</p>
      <p><strong>Localização:</strong> ${produto.localizacao}</p>
    `;

    // Adiciona o novo produto à lista
    listaProdutos.appendChild(produtoElement);
  }
});

