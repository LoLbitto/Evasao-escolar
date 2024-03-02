"use strict";
var _a, _b, _c, _d, _e;
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
    radioInputs === null || radioInputs === void 0 ? void 0 : radioInputs.forEach(radioInput => {
        var _a;
        if (radioInput.checked) {
            if (textoDoInput) {
                valor = (_a = radioInput.parentElement) === null || _a === void 0 ? void 0 : _a.innerText;
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
for (let i = 0; i < (valoresMenus === null || valoresMenus === void 0 ? void 0 : valoresMenus.length); i++) {
    valoresMenus[i].addEventListener("click", () => {
        var _a;
        let show = ((_a = seletores[i]) === null || _a === void 0 ? void 0 : _a.style.display) == "none";
        if (show) {
            seletores[i].style.display = "flex";
            return;
        }
        seletores[i].style.display = "none";
    });
    (_a = butoesFecharSeletor[i]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => seletores[i].style.display = "none");
    (_b = seletores[i]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        valoresMenus[i].innerText = valorDosRadio(nomesRadio[i]) != "" ? valorDosRadio(nomesRadio[i], true) : valoresInciaisSeletores[i];
    });
    (_c = caixasDeBusca[i]) === null || _c === void 0 ? void 0 : _c.addEventListener("input", () => {
        var _a;
        (_a = opcoesSeletores[i]) === null || _a === void 0 ? void 0 : _a.forEach(opcao => {
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
butaoLimparForm === null || butaoLimparForm === void 0 ? void 0 : butaoLimparForm.addEventListener("click", limparForm);
(_d = seletores[0]) === null || _d === void 0 ? void 0 : _d.addEventListener("click", seletorUnidadeFedarativaCallback);
(_e = seletores[1]) === null || _e === void 0 ? void 0 : _e.addEventListener("click", seletorCidadeCallback);
seletorUnidadeFedarativaCallback();
criarOpcoesRenda();
