//Obter o botão da tela 1 pegando pelo id, usando o getElementById
const botaoMostrarTela1 = document.getElementById("mostrarTela1");
const tela1 = document.querySelector(".tela1");

//Adicionar o evento do botão
botaoMostrarTela1.addEventListener("click", function(){
    tela1.style.display = "block";                  //torna a tela 1 visivel
    botaoMostrarTela1.style.display = "none";       //esconde o botão 
})