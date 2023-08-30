"use strict";
const seletores = document.querySelectorAll(".seletor");
const butoesFecharSeletor = document.querySelectorAll(".seletor button");
const seletorRenda = document.querySelector("select[name=rendaFamiliar]");
const caixasDeBusca = document.querySelectorAll(".busca");
const valoresMenus = document.querySelectorAll(".valorMenu");
const butaoLimparForm = document.querySelector("#limparForm");
const form = document.querySelector("form");
const nomesRadio = ["UF", "cidade", "escola"];
const valoresInciaisSeletores = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
];
let opcoesSeletores = [
    document.querySelectorAll("#seletorUFs label"),
    null,
    null
];
const removerElementosPelaClasse = (classe) => {
    document.querySelectorAll(classe).forEach(elemento => elemento.remove());
};
const valorDosRadio = (nomeRadio, textoDoInput = false) => {
    let radioInputs = document.querySelectorAll(`input[name=${nomeRadio}]`);
    let valor = "";
    radioInputs?.forEach(radioInput => {
        if (radioInput.checked) {
            if (textoDoInput) {
                valor = radioInput.parentElement?.innerText;
            }
            else {
                valor = radioInput.value;
            }
        }
    });
    if (valor == undefined) {
        return "";
    }
    return valor;
};
const adicionarOpcao = (tagPai, valorOpcao, textoOpcao, classeElemento, nomeRadio) => {
    const labelTag = document.createElement("label");
    const inputTag = document.createElement("input");
    const inputTagTexto = document.createTextNode(textoOpcao);
    inputTag.value = valorOpcao;
    inputTag.type = "radio";
    inputTag.name = nomeRadio;
    labelTag.className = classeElemento;
    inputTag.required = true;
    labelTag.appendChild(inputTag);
    labelTag.appendChild(inputTagTexto);
    tagPai.appendChild(labelTag);
};
const criarOpcoesRenda = () => {
    if (!seletorRenda) {
        return;
    }
    let rangeValue = "";
    let valor = 0;
    const VALOR_MAXIMO = 3000;
    const STEP = 199;
    while (valor < VALOR_MAXIMO) {
        rangeValue = "R$" + valor.toString();
        valor += STEP + 0.99;
        rangeValue += ' - R$' + valor.toString();
        let optionTag = document.createElement("option");
        optionTag.text = rangeValue;
        optionTag.value = rangeValue;
        seletorRenda.appendChild(optionTag);
        valor += 0.01;
    }
    let optionTag = document.createElement("option");
    optionTag.text = `Mais que R$${valor}`;
    optionTag.value = `${valor}+`;
    seletorRenda.appendChild(optionTag);
};
const limparForm = () => {
    if (form == null) {
        return;
    }
    if (!(window.confirm("Limpar o formulário? "))) {
        return;
    }
    form.reset();
    removerElementosPelaClasse(".cidade");
    removerElementosPelaClasse(".escola");
    for (let i = 0; i < valoresInciaisSeletores.length; i++) {
        seletores[i].style.display = "none";
        valoresMenus[i].innerHTML = valoresInciaisSeletores[i];
    }
};
const esconderGrupoVazio = () => {
    const h4Titulos = document.querySelectorAll(".grupoDeOpcoes h4");
    const opcoesGrupos = document.querySelectorAll(".grupoDeOpcoes label");
    const tamanhoGrupos = [7, 9, 4, 4, 3];
    let todosOcultos = true;
    let tamanho = 0;
    let counter = 0;
    for (let i = 0; i < tamanhoGrupos.length; i++) {
        tamanho += tamanhoGrupos[i];
        todosOcultos = true;
        for (let j = tamanho - tamanhoGrupos[i]; j < opcoesGrupos.length && j < tamanho; j++) {
            console.log(j);
            if (opcoesGrupos[j].style.display != "none") {
                todosOcultos = false;
            }
        }
        if (todosOcultos) {
            h4Titulos[i].style.display = "none";
        }
        else {
            h4Titulos[i].style.display = "block";
        }
    }
};
const seletorCidadeCallback = () => {
    removerElementosPelaClasse(".escola");
    let UF = valorDosRadio("UF");
    let cidade = valorDosRadio("cidade");
    if (cidade == "" || UF == "") {
        return;
    }
    fetch(`informacoesJSON/informacoesEscolas/escolas${UF}.json`).then(response => response.json()).then((json) => {
        json[cidade].forEach((escola) => {
            adicionarOpcao(seletores[2], escola, escola, "escola", "escola");
            opcoesSeletores[2] = document.querySelectorAll(".escola");
        });
    });
};
const seletorUnidadeFedarativaCallback = () => {
    let UF = valorDosRadio("UF");
    if (UF == "") {
        return;
    }
    fetch("informacoesJSON/cidades.json").then(response => response.json().then(json => {
        removerElementosPelaClasse(".cidade");
        json[UF].forEach((cidade) => {
            adicionarOpcao(seletores[1], cidade, cidade, "cidade", "cidade");
            opcoesSeletores[1] = document.querySelectorAll(".cidade");
        });
    }));
    seletorCidadeCallback();
};
for (let i = 0; i < valoresMenus?.length; i++) {
    valoresMenus[i].addEventListener("click", () => {
        let show = seletores[i]?.style.display == "none";
        if (show) {
            seletores[i].style.display = "flex";
            return;
        }
        seletores[i].style.display = "none";
    });
    butoesFecharSeletor[i]?.addEventListener("click", () => seletores[i].style.display = "none");
    seletores[i]?.addEventListener("click", () => {
        valoresMenus[i].innerText = valorDosRadio(nomesRadio[i]) != "" ? valorDosRadio(nomesRadio[i], true) : valoresInciaisSeletores[i];
    });
    caixasDeBusca[i]?.addEventListener("input", () => {
        opcoesSeletores[i]?.forEach(opcao => {
            if (opcao.innerText.toLowerCase().includes(caixasDeBusca[i].value.toLowerCase())) {
                opcao.style.display = "block";
            }
            else {
                opcao.style.display = "none";
            }
        });
        esconderGrupoVazio();
    });
}
if (valorDosRadio("UF")) {
    valoresMenus[0].innerText = valorDosRadio("UF", true);
}
butaoLimparForm?.addEventListener("click", limparForm);
seletores[0]?.addEventListener("click", seletorUnidadeFedarativaCallback);
seletores[1]?.addEventListener("click", seletorCidadeCallback);
seletorUnidadeFedarativaCallback();
