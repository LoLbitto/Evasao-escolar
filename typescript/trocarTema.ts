const rootHTML: HTMLElement | null = document.querySelector(":root")
const botaoTrocarTema: HTMLButtonElement | null = document.querySelector(".trocarTema")
const imagemBotaoHome: HTMLImageElement | null = document.querySelector(".home img")
const imagemBotao: HTMLImageElement | null = document.querySelector(".trocarTema img")
const logoIF: HTMLImageElement | null = document.querySelector("#logo")

// Salva o tema preferido no local storage para que possa acessado em outras páginas
if (!window.localStorage.getItem("tema")){
    window.localStorage.setItem("tema", matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark")
}


const variaveisCSS = [
    // light-claro | dark-escuro
    {
        "nomeVar": "--corFundo",
        "valores": ["#ffffff", "#070707"]
    },
    {
        "nomeVar": "--corFonte",
        "valores": ["#000000", "#ffffff"]
    }
]

const mudarTema = () => {
    let indexCor: 0 | 1

    if (window.localStorage.getItem("tema") == "light") {
        window.localStorage.setItem("tema", "dark")
        indexCor = 0
    } else {
        window.localStorage.setItem("tema", "light")
        indexCor = 1 
    }

    mudarLogo()
    mudarBotao()

    variaveisCSS.forEach(variavel => {
        rootHTML?.style.setProperty(variavel.nomeVar, variavel.valores[indexCor])
    })

}

const mudarLogo = () => {
    if (!logoIF) { return }

    const imagensLogo = ["logos/logoIF.png", "logos/logoIFDarkMode.png"]

    if (window.localStorage.getItem("tema") == "light") {
        logoIF.src = imagensLogo[1]
        return
    }

    logoIF.src = imagensLogo[0]
}

const mudarBotao = () => {
    if (!botaoTrocarTema || !imagemBotao) { return }

    const imagensBotaoTema = ["featherIcons/sun.svg", "featherIcons/moon.svg"]
    const imagensBotaoHome = ["featherIcons/home.svg", "featherIcons/homeDarkMode.svg"]

    if (window.localStorage.getItem("tema") == "light") {
        imagemBotao.src = imagensBotaoTema[1]
        if (imagemBotaoHome) { imagemBotaoHome.src = imagensBotaoHome[1] }
        return
    }

    if (imagemBotaoHome) { imagemBotaoHome.src = imagensBotaoHome[0] }
    imagemBotao.src = imagensBotaoTema[0]
}

// Sim, a função precisa ser chamada duas vezes inicialmente para funcionar corretamente
mudarTema()
mudarTema()

botaoTrocarTema?.addEventListener("click", mudarTema)
