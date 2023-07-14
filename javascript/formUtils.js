"use strict";
const seletores = document.querySelectorAll(".seletor");
const butoesFecharSeletor = document.querySelectorAll(".seletor button");
const caixasDeBusca = document.querySelectorAll(".busca");
const valoresMenus = document.querySelectorAll(".valorMenu");
const nomesRadio = ["UF", "Cidade", "Instituicao"];
const valoresInciaisSeletores = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
];
const removerElementosPelaClasse = (classe) => {
    document.querySelectorAll(classe).forEach(elemento => elemento.remove);
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
const limparForm = (form, outrosElementos) => {
    if (form == null) {
        return;
    }
    if (!(window.confirm("Limpar o formulário? "))) {
        return;
    }
    outrosElementos.forEach((elemento) => {
        if (elemento == null) {
            return;
        }
        elemento.style.display = "none";
    });
    form.reset();
    removerElementosPelaClasse(".cidades");
    removerElementosPelaClasse(".escolas");
    for (let i = 0; i < valoresInciaisSeletores.length; i++) {
        seletores[i].style.display = "none";
        caixasDeBusca[i].style.display = "none";
    }
};
for (let i = 0; i < valoresMenus?.length; i++) {
    valoresMenus[i].addEventListener("click", () => {
        let show = seletores[i]?.style.display == "none";
        console.log(show);
        if (show) {
            seletores[i].style.display = "flex";
            return;
        }
        seletores[i].style.display = "none";
    });
    butoesFecharSeletor[i]?.addEventListener("click", () => seletores[i].style.display = "none");
    seletores[i]?.addEventListener("mouseleave", () => seletores[i].style.display = "none");
    seletores[i]?.addEventListener("click", () => {
        valoresMenus[i].innerText = valorDosRadio(nomesRadio[i]) != "" ? valorDosRadio(nomesRadio[i], true) : dropdownValuesBoxesDefaultVales[i];
    });
}
