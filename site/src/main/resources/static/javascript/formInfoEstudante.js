"use strict";
var _a, _b;
const inputsNomeEOuMatricula = document.querySelectorAll("input[name=nome_ou_matricula]");
const inputNomeEstudante = document.querySelector("input[name=nome_estudante]");
const divInputNomeEstudante = (_a = inputNomeEstudante === null || inputNomeEstudante === void 0 ? void 0 : inputNomeEstudante.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
const inputNumeroMatricula = document.querySelector("input[name=numero_matricula]");
const divInputNumeroMatricula = (_b = inputNumeroMatricula === null || inputNumeroMatricula === void 0 ? void 0 : inputNumeroMatricula.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
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
form === null || form === void 0 ? void 0 : form.addEventListener("reset", (e) => setTimeout(aparenciaInputsNomeEMatricula, 0));
aparenciaInputsNomeEMatricula();
