const ulEmails: HTMLUListElement | null = document.querySelector("#emails")
const ulTelefones: HTMLUListElement | null = document.querySelector("#telefones")


const transformarStringEmLista = (stringLista: string) => {
    stringLista = stringLista.substring(1, stringLista.length - 1)
    return stringLista.split(", ")
}

const lerAtributo = (elemento: HTMLElement, nomeAtributo: string): string[] | undefined => {
    let valorAtributo = elemento?.getAttribute(nomeAtributo)

    if (valorAtributo == null) { return }

    return transformarStringEmLista(valorAtributo)
}

const criarListaHTML = (valores: string[], elementoRoot: HTMLElement, textoSingular: string, textoPlural: string) => {
    let elementoLista: HTMLLIElement

    if (valores.length == 1 && valores[0]) {
        elementoRoot.textContent = textoSingular
    } else if (valores.length > 1) {
        elementoRoot.textContent = textoPlural
    }

    if (valores.every(valor => valor)) {
        valores.forEach(valor => {
            elementoLista = document.createElement("li")
            elementoLista.textContent = valor
            elementoRoot.appendChild(elementoLista)
        })
    }
}

const criarListaHTMLEmails = () => {
    if (ulEmails == null) return
    
    let valoresEmails = lerAtributo(ulEmails, "data-emails")

    if (valoresEmails == undefined) return

    criarListaHTML(valoresEmails, ulEmails, "E-Mail:", "E-Mails")
}

const criarListaHTMLTelefones = () => {
    if (ulTelefones == null) return

    let valoresTelefones = lerAtributo(ulTelefones, "data-telefones")

    if (valoresTelefones == undefined) return

    criarListaHTML(valoresTelefones, ulTelefones, "Telefone:", "Telefones:")
}

criarListaHTMLEmails()
criarListaHTMLTelefones()
