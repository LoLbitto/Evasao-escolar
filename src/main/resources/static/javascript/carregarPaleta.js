"use strict";
const tagPaletaComum = document.querySelector("paleta-comum");
const tagPaletaTemaEscuro = document.querySelector("paleta-tema-escuro");
let paletaComum = tagPaletaComum === null || tagPaletaComum === void 0 ? void 0 : tagPaletaComum.getAttribute("data-variaveis");
let paletaTemaEscuro = tagPaletaTemaEscuro === null || tagPaletaTemaEscuro === void 0 ? void 0 : tagPaletaTemaEscuro.getAttribute("data-variaveis");
const converterPaletaParaObjeto = (paleta) => {
    if (paleta == null || paleta == undefined) {
        return;
    }
    let variaveisPaleta;
    let variaveisCSS = [{ nomeVariavel: "", valor: "" }];
    variaveisCSS.pop();
    paleta = paleta.replace("{", "");
    paleta = paleta.replace("}", "");
    variaveisPaleta = paleta.split(", ");
    variaveisPaleta.forEach(variavel => {
        let partesVariavel = variavel.split('=');
        variaveisCSS.push({
            nomeVariavel: partesVariavel[0],
            valor: partesVariavel[1]
        });
    });
    return variaveisCSS;
};
const carregarPaleta = (variaveisCSS) => {
    let root = document.querySelector(":root");
    variaveisCSS.forEach(variavel => {
        root === null || root === void 0 ? void 0 : root.style.setProperty(variavel.nomeVariavel, variavel.valor);
    });
};
const pegarVariaveisTemasComums = (paletaTemaClaro, paletaTemaEscuro) => {
    let variaveisComums = [{ nomeVariavel: "", valores: [] }];
    variaveisComums.pop();
    for (let i = 0; i < paletaTemaEscuro.length; i++) {
        for (let j = 0; j < paletaTemaClaro.length; j++) {
            if (paletaTemaClaro[j].nomeVariavel == paletaTemaEscuro[i].nomeVariavel) {
                variaveisComums.push({
                    nomeVariavel: paletaTemaEscuro[i].nomeVariavel,
                    valores: [paletaTemaClaro[j].valor, paletaTemaEscuro[i].valor]
                });
            }
        }
    }
    return variaveisComums;
};
let variaveisPaletaComum = converterPaletaParaObjeto(paletaComum);
let variaveisPaletaTemaEscuro = converterPaletaParaObjeto(paletaTemaEscuro);
let temasVariaveisCSS;
if (variaveisPaletaComum && variaveisPaletaTemaEscuro) {
    carregarPaleta(variaveisPaletaComum);
    if (window.localStorage.getItem("tema") == "light") {
        carregarPaleta(variaveisPaletaTemaEscuro);
    }
    temasVariaveisCSS = pegarVariaveisTemasComums(variaveisPaletaComum, variaveisPaletaTemaEscuro);
}
