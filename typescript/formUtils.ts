const seletores: NodeListOf<HTMLDivElement> = document.querySelectorAll(".seletor")
const caixasDeBusca: NodeListOf<HTMLInputElement> = document.querySelectorAll(".busca") 
const valoresInciaisSeletores: string[] = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
]

const removerElementosPelaClasse = (classe: string) => {
    document.querySelectorAll(classe).forEach(elemento => elemento.remove)
}

const limparForm = (form: HTMLFormElement | null, outrosElementos: any[] | null[]) => {
    if (form == null) { return } 

    if (!(window.confirm("Limpar o formulário? "))) { return }

    outrosElementos.forEach((elemento) => {
        if (elemento == null) { return }
        elemento.style.display = "none"
    })

    form.reset()
    removerElementosPelaClasse(".cidades")
    removerElementosPelaClasse(".escolas")

    for (let i=0; i < valoresInciaisSeletores.length; i++) {
        seletores[i].style.display = "none"
        caixasDeBusca[i].style.display = "none"
    }
}