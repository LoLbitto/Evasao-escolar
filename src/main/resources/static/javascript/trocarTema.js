"use strict";
const rootHTML = document.querySelector(":root");
const botaoTrocarTema = document.querySelector(".trocarTema");
const imagemBotaoTema = document.querySelector(".trocarTema img");
const logoIF = document.querySelector("#logo");
if (!window.localStorage.getItem("tema")) {
    window.localStorage.setItem("tema", matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");
}
const variaveisCSS = [
    {
        "nomeVar": "--corFundo",
        "valores": ["#ffffff", "#070707"]
    },
    {
        "nomeVar": "--corFonte",
        "valores": ["#000000", "#ffffff"]
    }
];
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
    variaveisCSS.forEach(variavel => {
        rootHTML?.style.setProperty(variavel.nomeVar, variavel.valores[indexCor]);
    });
};
const mudarBotao = () => {
    if (!botaoTrocarTema || !imagemBotaoTema) {
        return;
    }
    const imagensBotaoTema = [
        "../static/featherIcons/sun.svg",
        "../static/featherIcons/moon.svg"
    ];
    if (window.localStorage.getItem("tema") == "light") {
        imagemBotaoTema.src = imagensBotaoTema[1];
        return;
    }
    imagemBotaoTema.src = imagensBotaoTema[0];
};
mudarTema();
mudarTema();
botaoTrocarTema?.addEventListener("click", mudarTema);
