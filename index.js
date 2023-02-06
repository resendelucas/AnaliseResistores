import valores from './valores.json' assert { type: 'json' };


function mostraValor(valor, tolerancia){
    console.log(tolerancia)
    console.log(valor)
    let multiplo = "Ω";
    if (valor >= 1000000000) {
        valor = valor/1000000000
        multiplo = "GΩ"
    }
    else if (valor >= 1000000){
        valor = valor/1000000
        multiplo = "MΩ"
    }
    else if (valor >= 1000){
        valor = valor/1000
        multiplo = "KΩ"
    }

    document.getElementById("valorTotal").innerText = valor + multiplo + " ± " + tolerancia + "%" 
}

function calculaValor(){
    let valorDuasFaixas = valores['valor-faixa'][cores[0]] + valores['valor-faixa'][cores[1]]
    let valorComMultiplicador = parseInt(valorDuasFaixas)*valores['valores-multiplicador'][cores[2]]
    let valorTotal = valorComMultiplicador + "Ω ± " + valores['valores-tolerancia'][cores[3]] + "%"
    let valorTolerancia = valores['valores-tolerancia'][cores[3]]
    console.log("valor = " + valorTolerancia)
    mostraValor(parseInt(valorComMultiplicador), valorTolerancia) // pode ser que tenha valor em float, mudar depois!!!
    // document.getElementById("valorTotal").innerText = valorTotal
}


function defineCor(faixa, cor){
    console.log(faixa)
    document.querySelector("#"+faixa).style['background-color'] = valores['cor-rgb'][cor];
    switch (faixa){
        case "primeira-faixa":
            cores[0] = cor;
            break;
        case "segunda-faixa":
            cores[1] = cor;
            break;
        case "terceira-faixa":
            cores[2] = cor;
            break;
        case "quarta-faixa":
            cores[3] = cor;
            break;
    }
    console.log(cores);
    calculaValor();
}

function pegaCor(e){
    let corId = e.target.id;
    let faixaAlvo = e.target.parentNode.parentNode.parentNode.id
    defineCor(faixaAlvo, corId)
}

// var faixasResistor = [".primeira-faixa",".segunda-faixa",".terceira-faixa",".quarta-faixa"]
let faixasMenu = ["#cores-primeira","#cores-segunda","#cores-terceira","#cores-quarta" ]
var cores = ['marrom', 'preto', 'vermelho', 'dourado'];
calculaValor();



for (var i = 0; i < 4; i++){
    console.log(document.querySelector(faixasMenu[i]))
    document.querySelector(faixasMenu[i]).addEventListener("click", pegaCor);
}



