"use strict";
const menuForms = document.querySelector("#forms");
const botaoMenuForms = document.querySelector("#botaoMenuForms");
botaoMenuForms?.addEventListener("click", () => {
    if (!menuForms) {
        return;
    }
    menuForms.style.display = menuForms.style.display == "none" ? "flex" : "none";
});
