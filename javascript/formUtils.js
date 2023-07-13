"use strict";
const seletores = document.querySelectorAll(".seletor");
const caixasDeBusca = document.querySelectorAll(".busca");
const valoresInciaisSeletores = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
];
const removerElementosPelaClasse = (classe) => {
    document.querySelectorAll(classe).forEach(elemento => elemento.remove);
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
