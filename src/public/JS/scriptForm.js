document.querySelector('.adicionarProd').addEventListener('click', function (e) {
    e.preventDefault();

    let isValid = true;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const dataNasc = document.getElementById('data_nasc');
    const produto = document.getElementById('produto');
    const descricao = document.getElementById('descricao');
    const local = document.getElementById('local');
    const valor = document.getElementById('valor');
    const imagem = document.getElementById('imagem');

    const nomeError = document.getElementById('errorNome');
    const emailError = document.getElementById('errorEmail');
    const telError = document.getElementById('errorTel');
    const dataError = document.getElementById('errorData');
    const produtoError = document.getElementById('errorProduto');
    const descricaoError = document.getElementById('errorDescricao');
    const localError = document.getElementById('errorLocal');
    const valorError = document.getElementById('errorValor');
    const imagemError = document.getElementById('errorImagem');

    if (!nome.value.trim()) {
        nome.classList.add('error');
        nomeError.textContent = "Nome é obrigatório.";
        isValid = false;
    } else {
        nome.classList.remove('error');
        nomeError.textContent = "";
    }

    if (!email.value.trim()){
        email.classList.add('error');
        emailError.textContent = "E-mail é obrigatório.";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        email.classList.add('error');
        emailError.textContent = "E-mail inválido.";
        isValid = false;
    } else {
        email.classList.remove('error');
        emailError.textContent = "";
    }

    if (!tel.value){
        tel.classList.add('error');
        telError.textContent = "Telefone é obrigatório.";
        isValid = false;
    } else if (!/\(\d{2}\) \d{5}-\d{4}/.test(tel.value)) {
        tel.classList.add('error');
        telError.textContent = "Telefone inválido.";
        isValid = false;
    } else {
        tel.classList.remove('error');
        telError.textContent = "";
    }

    const ano = new Date(dataNasc.value).getFullYear();
    if (isNaN(ano)) {
        dataNasc.classList.add('error');
        dataError.textContent = "Data de nascimento é obrigatório.";
        isValid = false;
    } else if (ano < 1900) {
        dataNasc.classList.add('error');
        dataError.textContent = "Data de nascimento inválida, somente a partir de 1900.";
        isValid = false;
    } else {
        dataNasc.classList.remove('error');
        dataError.textContent = "";
    }

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
        imagemError.textContent = "Por favor, selecione uma imagem.";
        isValid = false;
    } else {
        imagem.classList.remove('error');
        imagemError.textContent = "";
    }

    if (!isValid) {
        return;
    }
});

function mascaraTelefone(value) {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2');
}

function mascaraNome(value) {
    return value.replace(/[^a-zA-Z\s]/g, '');
}

tel.addEventListener('input', function () {
    this.value = mascaraTelefone(this.value);
});

nome.addEventListener('input', function () {
    this.value = mascaraNome(this.value);
});

function validarCampo(input, errorElement, validator) {
    input.addEventListener('input', function () {
        if (validator(this.value)) {
            input.classList.remove('error');
            errorElement.textContent = "";
        } else {
            input.classList.add('error');
            errorElement.textContent = "Campo inválido!";
        }
    });
}