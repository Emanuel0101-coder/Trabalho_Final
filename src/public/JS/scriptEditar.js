document.querySelector('.adicionarProd').addEventListener('click', function (e) {
    e.preventDefault();

    let isValid = true;

    const produto = document.getElementById('produto');
    const descricao = document.getElementById('descricao');
    const local = document.getElementById('local');
    const valor = document.getElementById('valor');
    const imagem = document.getElementById('imagem');

    const produtoError = document.getElementById('errorProduto');
    const descricaoError = document.getElementById('errorDescricao');
    const localError = document.getElementById('errorLocal');
    const valorError = document.getElementById('errorValor');
    const imagemError = document.getElementById('errorImagem');

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
    if (isNaN(valorNum)){
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

    if (!imagem.files.length) {
        imagem.classList.add('error');
        imagemError.textContent = "Por favor, insira uma imagem.";
        isValid = false;
    } else {
        imagem.classList.remove('error');
        imagemError.textContent = "";
    }

    if (!isValid) {
        return;
    }
});

function validarCampo(campo, mensagemErro, validacao) {
    campo.addEventListener('input', function () {
        const isValido = validacao(campo.value);
        if (isValido) {
            campo.classList.remove('error');
            mensagemErro.textContent = '';
        } else {
            campo.classList.add('error');
        }
    });
}