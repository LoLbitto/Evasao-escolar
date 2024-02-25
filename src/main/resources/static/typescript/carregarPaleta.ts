const tagPaletaComum: HTMLElement | null = document.querySelector("paleta-comum")
const tagPaletaTemaEscuro: HTMLElement | null = document.querySelector("paleta-tema-escuro")

let paletaComum = tagPaletaComum?.getAttribute("data-variaveis")
let paletaTemaEscuro = tagPaletaTemaEscuro?.getAttribute("data-variaveis")

const converterPaletaParaObjeto = (paleta: string | undefined | null) => {
    if (paleta == null || paleta == undefined) { return }
    let variaveisPaleta: string[];
    let variaveisCSS: [{nomeVariavel: string, valor: string}] = [{nomeVariavel: "", valor: ""}];
    variaveisCSS.pop()
    
    paleta = paleta.replace("{", "")
    paleta = paleta.replace("}", "")
    variaveisPaleta = paleta.split(", ")

    variaveisPaleta.forEach(variavel => {
        let partesVariavel = variavel.split('=')
        
        variaveisCSS.push({
            nomeVariavel: partesVariavel[0],
            valor: partesVariavel[1]
        })
    })

    return variaveisCSS
}

const carregarPaleta = (variaveisCSS: [{nomeVariavel: string, valor: string}]) => {
    let root: HTMLElement | null = document.querySelector(":root")

    variaveisCSS.forEach(variavel => {
        root?.style.setProperty(variavel.nomeVariavel, variavel.valor)
    })
}

const pegarVariaveisTemasComums = (
    paletaTemaClaro: [{nomeVariavel: string, valor: string}], 
    paletaTemaEscuro: [{nomeVariavel: string, valor: string}]
) => {
    let variaveisComums: [{nomeVariavel: string, valores: string[]}] = [{nomeVariavel: "", valores: []}]
    variaveisComums.pop() 
    
    for (let i = 0; i < paletaTemaEscuro.length; i++) {
        for (let j = 0; j < paletaTemaClaro.length; j++) {
            if (paletaTemaClaro[j].nomeVariavel == paletaTemaEscuro[i].nomeVariavel) {
                variaveisComums.push({
                    nomeVariavel: paletaTemaEscuro[i].nomeVariavel,
                    valores: [paletaTemaClaro[j].valor, paletaTemaEscuro[i].valor]
                })
            }
        }
    }

    return variaveisComums
}

let variaveisPaletaComum = converterPaletaParaObjeto(paletaComum)
let variaveisPaletaTemaEscuro = converterPaletaParaObjeto(paletaTemaEscuro)
let temasVariaveisCSS:  [{nomeVariavel: string, valores: string[]}]

if (variaveisPaletaComum && variaveisPaletaTemaEscuro) {
    carregarPaleta(variaveisPaletaComum)

    if (window.localStorage.getItem("tema") == "light" ) { carregarPaleta(variaveisPaletaTemaEscuro) }

    temasVariaveisCSS = pegarVariaveisTemasComums(variaveisPaletaComum, variaveisPaletaTemaEscuro)
}
