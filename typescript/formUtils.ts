const seletores: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".seletor")
const butoesFecharSeletor: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".seletor button") 
const caixasDeBusca: NodeListOf<HTMLInputElement> | null = document.querySelectorAll(".busca")
const valoresMenus: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll(".valorMenu")
const butaoLimparForm: HTMLButtonElement | null = document.querySelector("#limparForm")
const form: HTMLFormElement | null = document.querySelector("form")
const nomesRadio = ["UF", "cidade", "escola"]
const valoresInciaisSeletores: string[] = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
]

let opcoesSeletores: (NodeListOf<HTMLLabelElement> | null)[] = [
    document.querySelectorAll("#seletorUFs label"),
    null,
    null
]

// Helper functions — utilizadas por outras funções
const removerElementosPelaClasse = (classe: string) => {
    document.querySelectorAll(classe).forEach(elemento => elemento.remove())
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

const adicionarOpcao = (
    tagPai: HTMLElement,
    valorOpcao: string,
    textoOpcao: string,
    classeElemento: string,
    nomeRadio: string
) => {
    const labelTag: HTMLLabelElement = document.createElement("label")
    const inputTag: HTMLInputElement = document.createElement("input")
    const inputTagTexto: Text = document.createTextNode(textoOpcao)
    inputTag.value = valorOpcao
    inputTag.type = "radio"
    inputTag.name = nomeRadio
    labelTag.className = classeElemento
    inputTag.required = true
    labelTag.appendChild(inputTag)
    labelTag.appendChild(inputTagTexto)
    tagPai.appendChild(labelTag)
}

// Utilidade comuns dos formulários
// Reseta o formulário completamente.
const limparForm = () => {
    if (form == null) { return } 

    if (!(window.confirm("Limpar o formulário? "))) { return }

    form.reset()
    removerElementosPelaClasse(".cidade")
    removerElementosPelaClasse(".escola")

    for (let i=0; i < valoresInciaisSeletores.length; i++) {
        seletores[i].style.display = "none"
        valoresMenus[i].innerHTML = valoresInciaisSeletores[i]
    }
}

// Parte da programação da seleção da unidade federativa, cidade e instituição de ensino
const esconderGrupoVazio = () => {
    const h4Titulos: NodeListOf<HTMLHeadingElement> | null = document.querySelectorAll(".grupoDeOpcoes h4")
    const opcoesGrupos: NodeListOf<HTMLLabelElement> | null = document.querySelectorAll(".grupoDeOpcoes label")
    // Norte — Nordeste — Centro-Oeste — Sudeste — Sul
    const tamanhoGrupos = [7, 9, 4, 4, 3]

    let todosOcultos = true
    let tamanho = 0
    let counter = 0

    for (let i=0; i < tamanhoGrupos.length; i++) {
        tamanho += tamanhoGrupos[i]
        todosOcultos = true

        for (let j = tamanho - tamanhoGrupos[i]; j < opcoesGrupos.length && j < tamanho; j++) {
            console.log(j)
            if (opcoesGrupos[j].style.display != "none") {
                todosOcultos = false
            }
        }
        

        if (todosOcultos) {
            h4Titulos[i].style.display = "none"
        } else {
            h4Titulos[i].style.display = "block"
        }
    }
}

const seletorCidadeCallback = () => {
    removerElementosPelaClasse(".escola")
    
    let UF = valorDosRadio("UF")
    let cidade = valorDosRadio("cidade")

    if (cidade == "" || UF == "") { return }

    fetch(`informacoesJSON/informacoesEscolas/escolas${UF}.json`).then(response => response.json()).then((json) => {
        json[cidade].forEach((escola: string) => {
            adicionarOpcao(seletores[2], escola, escola, "escola", "escola")
            opcoesSeletores[2] = document.querySelectorAll(".escola")
        })
    })
}

const seletorUnidadeFedarativaCallback = () => {
    let UF = valorDosRadio("UF")

    if (UF == "") { return }

    fetch("informacoesJSON/cidades.json").then(response => response.json().then(json => {
        removerElementosPelaClasse(".cidade")
        json[UF].forEach((cidade: string) => {
            adicionarOpcao(seletores[1], cidade, cidade, "cidade", "cidade")
            opcoesSeletores[1] = document.querySelectorAll(".cidade")
        })
    }))

    seletorCidadeCallback()
}

for (let i=0; i < valoresMenus?.length; i++) {
    // mostrar ou esconder os menus dropdown
    valoresMenus[i].addEventListener("click", () => {
        let show: boolean = seletores[i]?.style.display == "none"

        if (show) {
            seletores[i].style.display = "flex"
            return
        }

        seletores[i].style.display = "none"
    })

    butoesFecharSeletor[i]?.addEventListener("click", () => seletores[i].style.display = "none")
    //seletores[i]?.addEventListener("mouseleave", () => seletores[i].style.display = "none")
    seletores[i]?.addEventListener("click", () => {
        valoresMenus[i].innerText = valorDosRadio(nomesRadio[i]) != "" ? valorDosRadio(nomesRadio[i], true) : valoresInciaisSeletores[i]
    })
    caixasDeBusca[i]?.addEventListener("input", () => {
        opcoesSeletores[i]?.forEach(opcao => {
            if (opcao.innerText.toLowerCase().includes(caixasDeBusca[i].value.toLowerCase())) {
                opcao.style.display = "block"
            } else {
                opcao.style.display = "none"
            }
        })

        esconderGrupoVazio()
    })
}

if (valorDosRadio("UF")) { valoresMenus[0].innerText = valorDosRadio("UF", true) }
butaoLimparForm?.addEventListener("click", limparForm)
seletores[0]?.addEventListener("click", seletorUnidadeFedarativaCallback)
seletores[1]?.addEventListener("click", seletorCidadeCallback)
seletorUnidadeFedarativaCallback()
