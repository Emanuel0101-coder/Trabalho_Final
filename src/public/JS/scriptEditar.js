// document.querySelector('.adicionarProd').addEventListener('click', function (e) {
//     e.preventDefault();

//     let isValid = true;

//     const produto = document.getElementById('produto');
//     const descricao = document.getElementById('descricao');
//     const local = document.getElementById('local');
//     const valor = document.getElementById('valor');
//     const imagem = document.getElementById('imagem');

//     const produtoError = document.getElementById('errorProduto');
//     const descricaoError = document.getElementById('errorDescricao');
//     const localError = document.getElementById('errorLocal');
//     const valorError = document.getElementById('errorValor');
//     const imagemError = document.getElementById('errorImagem');

//     if (!produto.value.trim()) {
//         produto.classList.add('error');
//         produtoError.textContent = "Nome do produto é obrigatório.";
//         isValid = false;
//     } else {
//         produto.classList.remove('error');
//         produtoError.textContent = "";
//     }

//     if (!descricao.value.trim()) {
//         descricao.classList.add('error');
//         descricaoError.textContent = "Descrição é obrigatória.";
//         isValid = false;
//     } else {
//         descricao.classList.remove('error');
//         descricaoError.textContent = "";
//     }

//     if (!local.value.trim()) {
//         local.classList.add('error');
//         localError.textContent = "Localização é obrigatória.";
//         isValid = false;
//     } else {
//         local.classList.remove('error');
//         localError.textContent = "";
//     }

//     const valorNum = parseFloat(valor.value.replace(',', '.'));
//     if (isNaN(valorNum)){
//         valor.classList.add('error');
//         valorError.textContent = "Valor é obrigatório.";
//         isValid = false;
//     } else if (valorNum < 0.01 || valorNum > 10000) {
//         valor.classList.add('error');
//         valorError.textContent = "Valor deve estar entre R$0,01 e R$10.000,00.";
//         isValid = false;
//     } else {
//         valor.classList.remove('error');
//         valorError.textContent = "";
//     }

//     if (!imagem.files.length) {
//         imagem.classList.add('error');
//         imagemError.textContent = "Por favor, insira uma imagem.";
//         isValid = false;
//     } else {
//         imagem.classList.remove('error');
//         imagemError.textContent = "";
//     }

//     if (!isValid) {
//         return;
//     }
// });

// function validarCampo(campo, mensagemErro, validacao) {
//     campo.addEventListener('input', function () {
//         const isValido = validacao(campo.value);
//         if (isValido) {
//             campo.classList.remove('error');
//             mensagemErro.textContent = '';
//         } else {
//             campo.classList.add('error');
//         }
//     });
// }

// // scriptEditar.js

// // Função para obter o valor do parâmetro 'id' na URL
// function getUrlParameter(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
//   }
  
//   // Função para carregar os dados do produto
//   function carregarProduto() {
//     const produtoId = getUrlParameter('id');
    
//     if (!produtoId) {
//       alert('ID do produto não encontrado!');
//       return;
//     }
  
//     // Buscar os dados do produto usando a API
//     fetch(`/api/produtos/${produtoId}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.error) {
//           alert(data.error);
//           return;
//         }
  
//         // Preencher os campos do formulário com os dados do produto
//         document.getElementById('produto').value = data.nome;
//         document.getElementById('descricao').value = data.descricao;
//         document.getElementById('categoria').value = data.categoria;
//         document.getElementById('local').value = data.localizacao;
//         document.getElementById('valor').value = data.valor;
  
//         // Preencher outros campos se necessário, por exemplo, a imagem
//         // Aqui, você pode mostrar a imagem atual, mas a edição da imagem pode ser opcional
//         // Se for necessário, mostre uma visualização da imagem atual
//       })
//       .catch(error => {
//         console.error('Erro ao carregar o produto:', error);
//       });
//   }
  
//   // Executar a função de carregar o produto ao carregar a página
//   window.onload = carregarProduto;
// scriptEditar.js

//separando//

// document.querySelector('.adicionarProd').addEventListener('click', function (e) {
//   e.preventDefault();

//   let isValid = true;

//   const produto = document.getElementById('produto');
//   const descricao = document.getElementById('descricao');
//   const local = document.getElementById('local');
//   const valor = document.getElementById('valor');
//   const imagem = document.getElementById('imagem');

//   const produtoError = document.getElementById('errorProduto');
//   const descricaoError = document.getElementById('errorDescricao');
//   const localError = document.getElementById('errorLocal');
//   const valorError = document.getElementById('errorValor');
//   const imagemError = document.getElementById('errorImagem');

//   // Validação de campos
//   if (!produto.value.trim()) {
//       produto.classList.add('error');
//       produtoError.textContent = "Nome do produto é obrigatório.";
//       isValid = false;
//   } else {
//       produto.classList.remove('error');
//       produtoError.textContent = "";
//   }

//   if (!descricao.value.trim()) {
//       descricao.classList.add('error');
//       descricaoError.textContent = "Descrição é obrigatória.";
//       isValid = false;
//   } else {
//       descricao.classList.remove('error');
//       descricaoError.textContent = "";
//   }

//   if (!local.value.trim()) {
//       local.classList.add('error');
//       localError.textContent = "Localização é obrigatória.";
//       isValid = false;
//   } else {
//       local.classList.remove('error');
//       localError.textContent = "";
//   }

//   const valorNum = parseFloat(valor.value.replace(',', '.'));
//   if (isNaN(valorNum)) {
//       valor.classList.add('error');
//       valorError.textContent = "Valor é obrigatório.";
//       isValid = false;
//   } else if (valorNum < 0.01 || valorNum > 10000) {
//       valor.classList.add('error');
//       valorError.textContent = "Valor deve estar entre R$0,01 e R$10.000,00.";
//       isValid = false;
//   } else {
//       valor.classList.remove('error');
//       valorError.textContent = "";
//   }

//   if (!imagem.files.length) {
//       imagem.classList.add('error');
//       imagemError.textContent = "Por favor, insira uma imagem.";
//       isValid = false;
//   } else {
//       imagem.classList.remove('error');
//       imagemError.textContent = "";
//   }

//   if (!isValid) {
//       return;
//   }

//   // Se os dados estiverem corretos, enviar os dados de edição para o servidor
//   const produtoId = getUrlParameter('id');
//   const formData = new FormData();
//   formData.append('nome', produto.value);
//   formData.append('descricao', descricao.value);
//   formData.append('categoria', document.getElementById('categoria').value);
//   formData.append('localizacao', local.value);
//   formData.append('valor', valorNum);
//   formData.append('imagem', imagem.files[0]);

//   fetch(`/api/produtos/${produtoId}`, {
//       method: 'PUT',
//       body: formData,
//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data.message) {
//           alert(data.message);
//       } else {
//           alert("Erro ao editar o produto.");
//       }
//   })
//   .catch(error => {
//       console.error('Erro:', error);
//       alert('Erro ao editar o produto.');
//   });
// });

// // Função para obter o valor do parâmetro 'id' na URL
// function getUrlParameter(name) {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(name);
// }

// // Função para carregar os dados do produto
// function carregarProduto() {
//   const produtoId = getUrlParameter('id');
  
//   if (!produtoId) {
//       alert('ID do produto não encontrado!');
//       return;
//   }

//   // Buscar os dados do produto usando a API
//   fetch(`/api/produtos/${produtoId}`)
//       .then(response => response.json())
//       .then(data => {
//           if (data.error) {
//               alert(data.error);
//               return;
//           }

//           // Preencher os campos do formulário com os dados do produto
//           document.getElementById('produto').value = data.nome;
//           document.getElementById('descricao').value = data.descricao;
//           document.getElementById('categoria').value = data.categoria;
//           document.getElementById('local').value = data.localizacao;
//           document.getElementById('valor').value = data.valor;

//           // Preencher a imagem se necessário (opcional)
//           // Aqui você pode mostrar uma visualização da imagem atual ou lidar com isso conforme necessário
//       })
//       .catch(error => {
//           console.error('Erro ao carregar o produto:', error);
//       });
// }

// // Executar a função de carregar o produto ao carregar a página
// window.onload = carregarProduto;

document.addEventListener('DOMContentLoaded', function() {
    // Função para pegar o parâmetro 'id' da URL
    const produtoId = getUrlParameter('id');
    console.log('Produto ID:', produtoId); // Verifique se o valor do ID é capturado corretamente

    if (!produtoId) {
        alert('ID do produto não fornecido na URL.');
        return; // Se o ID não estiver na URL, não vai continuar
    }

    // Coloque o código do seu formulário de edição e envio aqui
    // Exemplo de código que você já tem para editar o produto
    document.querySelector('.adicionarProd').addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Botão Editar Produto clicado.');

        let isValid = true;
        const produto = document.getElementById('produto');
        const descricao = document.getElementById('descricao');
        const local = document.getElementById('local');
        const valor = document.getElementById('valor');
        const imagem = document.getElementById('imagem');

        console.log('Valores dos campos antes da validação:');
        console.log('Produto:', produto.value);
        console.log('Descrição:', descricao.value);
        console.log('Localização:', local.value);
        console.log('Valor:', valor.value);
        console.log('Imagem:', imagem.files);

        // Validar campos
        const produtoError = document.getElementById('errorProduto');
        const descricaoError = document.getElementById('errorDescricao');
        const localError = document.getElementById('errorLocal');
        const valorError = document.getElementById('errorValor');

        if (!produto.value.trim()) {
            produto.classList.add('error');
            produtoError.textContent = "Nome do produto é obrigatório.";
            isValid = false;
        } else {
            produto.classList.remove('error');
            produtoError.textContent = "";
        }

        if (!descricao.value.trim()) {
            descricao.classList.add('error');
            descricaoError.textContent = "Descrição é obrigatória.";
            isValid = false;
        } else {
            descricao.classList.remove('error');
            descricaoError.textContent = "";
        }

        if (!local.value.trim()) {
            local.classList.add('error');
            localError.textContent = "Localização é obrigatória.";
            isValid = false;
        } else {
            local.classList.remove('error');
            localError.textContent = "";
        }

        const valorNum = parseFloat(valor.value.replace(',', '.'));
        if (isNaN(valorNum)) {
            valor.classList.add('error');
            valorError.textContent = "Valor é obrigatório.";
            isValid = false;
        } else if (valorNum < 0.01 || valorNum > 10000) {
            valor.classList.add('error');
            valorError.textContent = "Valor deve estar entre R$0,01 e R$10.000,00.";
            isValid = false;
        } else {
            valor.classList.remove('error');
            valorError.textContent = "";
        }

        if (!isValid) {
            console.log('Validação falhou.');
            return;
        }

        const formData = new FormData();
        formData.append('nome', produto.value);  // Mantendo a consistência
        formData.append('descricao', descricao.value);
        formData.append('categoria', document.getElementById('categoria').value);
        formData.append('localizacao', local.value);
        formData.append('valor', valorNum);

        if (imagem.files.length) {
            formData.append('imagem', imagem.files[0]);
        }

        console.log('Dados enviados para o servidor:', [...formData.entries()]);

        // Envio para o servidor via PUT
        fetch(`/api/produtos/${produtoId}`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.message) {
                alert(data.message);
            } else {
                alert("Erro ao editar o produto.");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao editar o produto.');
        });
    });
});

// Função para pegar o parâmetro 'id' da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(name);
    console.log(`Parâmetro "${name}" encontrado:`, value); // Log para depurar
    return value;
}
