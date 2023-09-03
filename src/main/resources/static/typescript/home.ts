const menuForms: HTMLDivElement | null = document.querySelector("#forms")
const botaoMenuForms: HTMLButtonElement | null = document.querySelector("#botaoMenuForms")

botaoMenuForms?.addEventListener("click", () => {
    if (!menuForms) { return }

    menuForms.style.display = menuForms.style.display == "none" ? "flex" : "none" 
})
