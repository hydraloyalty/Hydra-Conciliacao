// JavaScript Document

document.addEventListener('DOMContentLoaded', function () {
    const inputNome = document.getElementById('inputNome');
    const inputID = document.getElementById('inputID');
    const inputAgencia = document.getElementById('inputAgencia');
    const inputConta = document.getElementById('inputConta');
    const inputBanco = document.getElementById('inputBanco');
    const inputChave = document.getElementById('inputChave');
    const inputData = document.getElementById('inputData');
    const campoNome = document.getElementById('campo-nome');
    const campoID = document.getElementById('campo-id');
    const campoAgencia = document.getElementById('campo-agencia');
    const campoConta = document.getElementById('campo-conta');
    const campoBanco = document.getElementById('campo-banco');
    const campoChave = document.getElementById('campo-chave');
    const campoData = document.getElementById('campo-data');

    inputNome.addEventListener('input', function() {
        let inputValue = this.value;
        campoNome.textContent = inputValue; // Atualiza o valor exibido em "campo-nome"
    });
    
    inputAgencia.addEventListener('input', function() {
        let inputValue = this.value;
        campoAgencia.textContent = inputValue; // Atualiza o valor exibido em "campo-nome"
    });
    
    inputConta.addEventListener('input', function() {
        let inputValue = this.value;
        campoConta.textContent = inputValue; // Atualiza o valor exibido em "campo-nome"
    });
    
    inputBanco.addEventListener('input', function() {
        let inputValue = this.value;
        campoBanco.textContent = inputValue; // Atualiza o valor exibido em "campo-nome"
    });
    
    function formatarID(valor) {
        valor = valor.replace(/\D/g, ''); // Remove não dígitos

        if (valor.length === 11) {
            valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // CPF
        } else if (valor.length === 14) {
            valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // CNPJ
        }

        if (valor.length > 18) { // Limite para 14 dígitos e 4 pontuações
            valor = valor.substring(0, 18);
        }

        return valor;
    }

    function formatarChave(valor) {
        valor = valor.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
        valor = valor.slice(0, 24); // Limita a 24 caracteres

        // Formata a cada 4 dígitos com um traço
        valor = valor.replace(/(\d{4})/g, '$1-');
        if (valor.endsWith('-')) {
            valor = valor.slice(0, -1); // Remove traço no final, se houver
        }

        return valor;
    }

    function formatarData(valor) {
        valor = valor.replace(/\D/g, ''); // Remove não dígitos

        // Lógica para adicionar as barras de acordo com a entrada
        if (valor.length > 2 && valor.length <= 4) {
            valor = valor.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        } else if (valor.length > 4 && valor.length <= 6) {
            valor = valor.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        } else if (valor.length > 6) {
            valor = valor.replace(/(\d{2})(\d{2})(\d{4})(\d{0,4})/, '$1/$2/$3');
        }

        return valor.slice(0, 10); // Limita a 10 caracteres
    }

    function atualizarCampos() {
        campoID.textContent = formatarID(inputID.value);
        campoChave.textContent = formatarChave(inputChave.value);
        campoData.textContent = formatarData(inputData.value);
    }

    inputID.addEventListener('input', function() {
        inputID.value = formatarID(inputID.value);
        atualizarCampos();

        // Se formatar como CNPJ, desabilitar a entrada de mais caracteres
        if (inputID.value.length === 18) {
            inputID.setAttribute('maxlength', '18');
        } else {
            inputID.removeAttribute('maxlength');
        }
    });

    inputChave.addEventListener('input', function() {
        inputChave.value = formatarChave(inputChave.value);
        atualizarCampos();
    });

    inputData.addEventListener('input', function() {
        inputData.value = formatarData(inputData.value);
        atualizarCampos();
    });

    // Atualizar campos ao carregar a página
    atualizarCampos();
});

document.addEventListener('DOMContentLoaded', function () {
    // ...outros códigos...

    var botaoImprimir = document.getElementById('botao-imprimir');
    var secaoConfig = document.querySelector('.config'); // Certifique-se de que o seletor corresponda à sua classe de configuração

    if (botaoImprimir && secaoConfig) {
        botaoImprimir.addEventListener('click', function () {
            // Adiciona uma classe para ocultar a seção de configuração
            secaoConfig.classList.add('ocultar-na-impressao');

            // Dispara a impressão
            window.print();

            // Espera um pouco antes de remover a classe (por exemplo, 500 milissegundos)
            setTimeout(function () {
                secaoConfig.classList.remove('ocultar-na-impressao');
            }, 500);
        });
    }
});