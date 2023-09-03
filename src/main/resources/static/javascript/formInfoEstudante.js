"use strict";
const inputsNomeEOuMatricula = document.querySelectorAll("input[name=nome_ou_matricula]");
const inputNomeEstudante = document.querySelector("input[name=nome_estudante]");
const divInputNomeEstudante = inputNomeEstudante?.parentElement?.parentElement;
const inputNumeroMatricula = document.querySelector("input[name=numero_matricula]");
const divInputNumeroMatricula = inputNumeroMatricula?.parentElement?.parentElement;
const aparenciaInputsNomeEMatricula = () => {
    if (!inputNomeEstudante || !inputNumeroMatricula) {
        return;
    }
    if (!divInputNomeEstudante || !divInputNumeroMatricula) {
        return;
    }
    divInputNomeEstudante.style.display = inputsNomeEOuMatricula[0].checked ? "block" : "none";
    divInputNumeroMatricula.style.display = inputsNomeEOuMatricula[1].checked ? "block" : "none";
    inputNomeEstudante.required = inputsNomeEOuMatricula[0].checked;
    inputNumeroMatricula.required = inputsNomeEOuMatricula[1].checked;
};
inputsNomeEOuMatricula.forEach(input => input.addEventListener("change", aparenciaInputsNomeEMatricula));
form?.addEventListener("reset", (e) => setTimeout(aparenciaInputsNomeEMatricula, 0));
aparenciaInputsNomeEMatricula();
