
document.addEventListener('DOMContentLoaded', function() {
    const produtoId = getUrlParameter('id');
    console.log('Produto ID:', produtoId); corretamente

    if (!produtoId) {
        alert('ID do produto não fornecido na URL.');
        return; 
    }

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
        formData.append('nome', produto.value);  
        formData.append('descricao', descricao.value);
        formData.append('categoria', document.getElementById('categoria').value);
        formData.append('localizacao', local.value);
        formData.append('valor', valorNum);

        if (imagem.files.length) {
            formData.append('imagem', imagem.files[0]);
        }

        console.log('Dados enviados para o servidor:', [...formData.entries()]);

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

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(name);
    console.log(`Parâmetro "${name}" encontrado:`, value); 
    return value;
}
