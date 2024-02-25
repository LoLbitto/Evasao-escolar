const rootHTML: HTMLElement | null = document.querySelector(":root")
const botaoTrocarTema: HTMLButtonElement | null = document.querySelector(".trocarTema")
const imagemBotaoTema: HTMLImageElement | null = document.querySelector(".trocarTema img")
const logoIF: HTMLImageElement | null = document.querySelector("#logo")

// Salva o tema preferido no local storage para que possa acessado em outras páginas
if (!window.localStorage.getItem("tema")){
    window.localStorage.setItem("tema", matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark")
}


const mudarTema = () => {
    let indexCor: 0 | 1

    if (window.localStorage.getItem("tema") == "light") {
        window.localStorage.setItem("tema", "dark")
        indexCor = 0
    } else {
        window.localStorage.setItem("tema", "light")
        indexCor = 1 
    }

    mudarBotao()

    temasVariaveisCSS.forEach(variavel => {
        rootHTML?.style.setProperty(variavel.nomeVariavel, variavel.valores[indexCor])
    })

}

const mudarBotao = () => {
    if (!botaoTrocarTema || !imagemBotaoTema) { return }

    const imagensBotaoTema = [
        "../featherIcons/sun.svg",
        "../featherIcons/moon.svg"
    ]

    if (window.localStorage.getItem("tema") == "light") {
        imagemBotaoTema.src = imagensBotaoTema[1]
        return
    }

    imagemBotaoTema.src = imagensBotaoTema[0]
}

// Sim, a função precisa ser chamada duas vezes inicialmente para funcionar corretamente
mudarTema()
mudarTema()

botaoTrocarTema?.addEventListener("click", mudarTema)
