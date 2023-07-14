const seletores: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".seletor")
const butoesFecharSeletor: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".seletor button") 
const caixasDeBusca: NodeListOf<HTMLInputElement> | null = document.querySelectorAll(".busca")
const valoresMenus: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll(".valorMenu")
const nomesRadio = ["UF", "Cidade", "Instituicao"]
const valoresInciaisSeletores: string[] = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
]

// Helper functions — utilizadas por outras funções
const removerElementosPelaClasse = (classe: string) => {
    document.querySelectorAll(classe).forEach(elemento => elemento.remove)
}

const valorDosRadio = (nomeRadio: string, textoDoInput: boolean=false) => {
    let radioInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll(`input[name=${nomeRadio}]`)
    // variável valor é necessária, pois return dentro do foreach retorna o foreach não essa função
    let valor: string | undefined = ""
    
    radioInputs?.forEach(radioInput => {
        if (radioInput.checked) {
            if (textoDoInput) {
                valor = radioInput.parentElement?.innerText
            } else {
                valor = radioInput.value
            }
        }
    })

    if (valor == undefined) {
        return ""
    }

    return valor
}

// Utilidade comuns dos formulários
// Reseta o formulário completamente.
// Outros elementos podem ser nulos ou não dependendo do formulário, por enquanto em ambos serão nulos
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

// Parte da programação da seleção da unidade federativa, cidade e instituição de ensino
for (let i=0; i < valoresMenus?.length; i++) {
    // mostrar ou esconder os menus dropdown
    valoresMenus[i].addEventListener("click", () => {
        let show: boolean = seletores[i]?.style.display == "none"
        console.log(show)

        if (show) {
            seletores[i].style.display = "flex"
            return
        }

        seletores[i].style.display = "none"
    })

    butoesFecharSeletor[i]?.addEventListener("click", () => seletores[i].style.display = "none")
    seletores[i]?.addEventListener("mouseleave", () => seletores[i].style.display = "none")
    seletores[i]?.addEventListener("click", () => {
        valoresMenus[i].innerText = valorDosRadio(nomesRadio[i]) != "" ? valorDosRadio(nomesRadio[i], true) : dropdownValuesBoxesDefaultVales[i]
    })
}
