let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroSecreto = numeroRandom(); // Declara a variável numeroSecreto e atribui a ela o valor retornado pela função numeroRandom(). Este será o número que o usuário deve adivinhar.
let tentativas = 1; // Declara a variável tentativas e inicializa com 1. Esta variável controlará o número de tentativas do usuário.

function exibirTexto(tag, texto) { // Define uma função chamada exibirTexto que recebe dois parâmetros: tag (seletor do elemento HTML) e texto (o texto a ser exibido).
    let campo = document.querySelector(tag); // Seleciona o elemento HTML com a tag especificada usando o querySelector.
    campo.innerHTML = texto; // Define o conteúdo HTML do elemento selecionado para o valor do parâmetro texto.
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2.0; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }}

function mensagemInicial(){
    exibirTexto('h1', 'Jogo do número Secreto'); // Chama a função exibirTexto para definir o texto do elemento <h1> para 'Jogo do número Secreto'.
    exibirTexto('p', 'Escolha um número entre 1 e 10'); // Chama a função exibirTexto para definir o texto do elemento <p> para 'Escolha um número entre 1 e 10'.
}

mensagemInicial();

function verificarChute() { // Define a função verificarChute, que será chamada quando o usuário enviar um palpite.
    let chute = document.querySelector('input').value; // Obtém o valor digitado pelo usuário no campo de input.

    if (chute == numeroSecreto) { // Verifica se o chute do usuário é igual ao número secreto.
        exibirTexto('h1', 'Acertou'); // Se acertou, exibe a mensagem 'Acertou' no elemento <h1>.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Determina se a palavra 'tentativa' deve ser no singular ou plural, dependendo do número de tentativas. Isso é um operador ternário.
        let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}!`; // Cria uma mensagem formatada com o número de tentativas.
        exibirTexto('p', mensagemTentativas); // Exibe a mensagem com o número de tentativas no elemento <p>.
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar o jogo, removendo o atributo 'disabled'.
    } else { // Se o chute for incorreto:
        if (chute > numeroSecreto) { // Verifica se o chute é maior que o número secreto.
            exibirTexto('p', 'O número secreto é menor'); // Se for maior, exibe a mensagem 'O número secreto é menor'.
        } else { // Se o chute for menor que o número secreto.
            exibirTexto('p', 'O número secreto é maior'); // Exibe a mensagem 'O número secreto é maior'.
        }
        tentativas++; // Incrementa o contador de tentativas.
        limparCampo(); // Chama a função limparCampo para limpar o campo de input.
    }
}

function numeroRandom() { // Define a função numeroRandom, que gera um número aleatório entre 1 e 10 (inclusive).
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 0 (inclusive) e 1 (exclusivo), multiplica por 10, adiciona 1 e converte para inteiro.
    let quantidadeDeElementos = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementos == numeroLimite) {
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return numeroRandom();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido
}
}

console.log(numeroSecreto); // Imprime o número secreto no console. Isso é útil para testes, mas deve ser removido na versão final.

function limparCampo() { // Define a função limparCampo, que limpa o valor do campo de input.
    chute = document.querySelector('input'); // Seleciona o elemento input.
    chute.value = ''; // Define o valor do input para uma string vazia, limpando o campo.
}

function reiniciarJogo() {
    numeroSecreto = numeroRandom();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}