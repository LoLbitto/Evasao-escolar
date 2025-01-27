"use strict";
const rootHTML = document.querySelector(":root");
const botaoTrocarTema = document.querySelector(".trocarTema");
const imagemBotaoTema = document.querySelector(".trocarTema img");
const logoIF = document.querySelector("#logo");
if (!window.localStorage.getItem("tema")) {
    window.localStorage.setItem("tema", matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");
}
const mudarTema = () => {
    let indexCor;
    if (window.localStorage.getItem("tema") == "light") {
        window.localStorage.setItem("tema", "dark");
        indexCor = 0;
    }
    else {
        window.localStorage.setItem("tema", "light");
        indexCor = 1;
    }
    mudarBotao();
    temasVariaveisCSS.forEach(variavel => {
        rootHTML === null || rootHTML === void 0 ? void 0 : rootHTML.style.setProperty(variavel.nomeVariavel, variavel.valores[indexCor]);
    });
};
const mudarBotao = () => {
    if (!botaoTrocarTema || !imagemBotaoTema) {
        return;
    }
    const imagensBotaoTema = [
        "../featherIcons/sun.svg",
        "../featherIcons/moon.svg"
    ];
    if (window.localStorage.getItem("tema") == "light") {
        imagemBotaoTema.src = imagensBotaoTema[1];
        return;
    }
    imagemBotaoTema.src = imagensBotaoTema[0];
};
mudarTema();
mudarTema();
botaoTrocarTema === null || botaoTrocarTema === void 0 ? void 0 : botaoTrocarTema.addEventListener("click", mudarTema);
