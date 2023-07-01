const studentInfoForm: HTMLFormElement | null = document.querySelector("form")
const clearFormButton: HTMLButtonElement | null = document.querySelector("#clearForm")
const sendFormButton: HTMLButtonElement | null = document.querySelector("#sendFormButton")
const jobInputRangeLabel: HTMLLabelElement | null = document.querySelector("#jobInputRangeLabel")
const jobInputsRadio: NodeListOf<HTMLInputElement> | null = document.querySelectorAll("input[name=studentWorks]")
const selectJobShfit: HTMLDivElement | null = document.querySelector("#jobShift")
const jobYesNoOption: HTMLDivElement | null = document.querySelector(".yesNoOption")
const allRangeInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll("input[type=range]")
const allRangeInfoSpans: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll(".rangeInfoSpan")
const allCheckboxsInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll("input[type=checkbox]")
const allSelector: NodeListOf<HTMLDivElement> | null = document.querySelectorAll("div.selector")
const allNumberInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll("input[type=number]")
const telephoneInput: HTMLInputElement | null = document.querySelector("input[type=tel]")
const studentNameInput: HTMLInputElement | null = document.querySelector("input[type=text]")
const searchBoxes: NodeListOf<HTMLInputElement> | null = document.querySelectorAll(".searchBox")
const dropdownValuesBoxes: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll(".dropdownValue")
const selectors: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".selector")
const closeDropdownButtons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".selector button")
const selectorOptionsNames: string[] = ["UF", "city", "school"]
const optionsGroup: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(".optionsGroup")
const optionsGroupTitle: NodeListOf<HTMLTitleElement> | null = document.querySelectorAll(".optionsGroup h4")
const dropdownValuesBoxesDefaultVales: string[] = [
    "Selecione um Estado/Unidade Federativa",
    "Selecione um Município",
    "Selecione uma Instituição de Ensino"
]

let selectOptions: (NodeListOf<HTMLLabelElement> | null)[] = [
    document.querySelectorAll("#federalUnitySelector label"), null, null
]

const rangeValues: string[][] = [
    ["não consegue", "consegue um pouco", "mais ou menos", "consegue", "consegue plenamente"],
    ["muito ruim", "ruim", "mais ou menos", "boa", "muita boa"]
]

let rangeInputIndex = 0

const clearForm = (form: HTMLFormElement | null) => {
    if (form === null || jobInputRangeLabel === null || selectJobShfit === null) { return }
    if (window.confirm("Limpar formulário? ")) {
        form.reset()
        jobInputRangeLabel.style.display = "none"
        selectJobShfit.style.display = "none"
        allRangeInfoSpans.forEach((rangeInfoSpan: HTMLSpanElement) => {
            rangeInfoSpan.innerText = ""
        })
        removeAllElementsByClassName(".dynamicCityOption")
        removeAllElementsByClassName(".dynamicSchoolOption")
        for (let i = 0; i < dropdownValuesBoxes.length; i++) {
            selectors[i].style.display = "none"
            dropdownValuesBoxes[i].innerText = dropdownValuesBoxesDefaultVales[i]
        }
    }
}

clearFormButton?.addEventListener("click", () => { clearForm(studentInfoForm) })

const changeInputRangeInfo = (
    rangeInput: HTMLInputElement | null,
    infoValues: string[],
    rangeSpanInfo: HTMLSpanElement | null
) => {
    if (rangeInput == null || rangeInput.value == null || rangeSpanInfo == null) { return }
    let infoValuesIndex: number = 2

    switch (Number(rangeInput.value)) {
        case 0.1:
        case 0.2:
            infoValuesIndex = 0
            break

        case 0.3:
        case 0.4:
            infoValuesIndex = 1
            break

        case 0.5:
        case 0.6:
            infoValuesIndex = 2
            break

        case 0.7:
        case 0.8:
            infoValuesIndex = 3
            break

        case 0.9:
        case 1:
            infoValuesIndex = 4
            break
    }

    rangeSpanInfo.innerText = infoValues[infoValuesIndex]
}

const addOptionToSelect = (
    parentTag: HTMLElement,
    optionValue: string,
    optionText: string,
    elementClassName: string,
    radioName: string
) => {
    const labelTag: HTMLLabelElement = document.createElement("label")
    const inputTag: HTMLInputElement = document.createElement("input")
    const inputTagText: Text = document.createTextNode(optionText)
    inputTag.value = optionValue
    inputTag.type = "radio"
    inputTag.name = radioName
    labelTag.className = elementClassName
    labelTag.appendChild(inputTag)
    labelTag.appendChild(inputTagText)
    parentTag.appendChild(labelTag)
}

const removeAllElementsByClassName = (className: string) => {
    document.querySelectorAll(className).forEach((item) => { item.remove() })
}

jobInputsRadio.forEach((radioInput: HTMLInputElement) => {
    radioInput?.addEventListener("change", () => {
        if (jobInputRangeLabel === null || jobInputsRadio === null || selectJobShfit === null) { return }

        if (jobInputsRadio[0].checked) {
            jobInputRangeLabel.style.display = "block"
            selectJobShfit.style.display = "grid"
            return
        }
        jobInputRangeLabel.style.display = "none"
        selectJobShfit.style.display = "none"
    })
})

allRangeInputs[0].addEventListener("change", () => {
    changeInputRangeInfo(allRangeInputs[0], rangeValues[0], allRangeInfoSpans[0])
})

for (let i = 1; i < allRangeInfoSpans.length; i++) {
    allRangeInputs[i]?.addEventListener("change", () => {
        changeInputRangeInfo(allRangeInputs[i], rangeValues[1], allRangeInfoSpans[i])
    })
}

const getRadioInputsValue = (radiosName: string, returnInnerText = false) => {
    let returnValue = "";
    let allRadioInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll("input[type=radio]")

    allRadioInputs.forEach((radioInput: HTMLInputElement) => {
        if (radioInput.name == radiosName) {
            if (radioInput.checked) {
                if (returnInnerText) {
                    returnValue = radioInput.parentElement?.innerText != undefined ? radioInput.parentElement?.innerText : ""
                } else {
                    returnValue = radioInput.value
                }
            }
        }
    })

    return returnValue
}

const federalUnitSelectorCallback = () => {
    removeAllElementsByClassName(".dynamicCityOption")

    let UF = getRadioInputsValue("UF")

    if (UF == "") { return }

    fetch("informacoesJSON/cidades.json").then((response) => response.json()).then((json) => {
        json[UF].forEach((city: string) => {
            addOptionToSelect(selectors[1], city, city, "dynamicCityOption", "city")
            selectOptions[1] = document.querySelectorAll(".dynamicCityOption")
        })
    })

    citySelectorCallback()
}

const citySelectorCallback = () => {
    removeAllElementsByClassName(".dynamicSchoolOption")

    let city = getRadioInputsValue("city")
    let UF = getRadioInputsValue("UF")

    if (city == "" || UF == "") { return }

    fetch(`informacoesJSON/informacoesEscolas/escolas${UF}.json`)
        .then((response) => response.json())
        .then((json) => {
            json[city].forEach((school: string) => {
                addOptionToSelect(selectors[2], school, school, "dynamicSchoolOption", "school")
            })
            selectOptions[2] = document.querySelectorAll(".dynamicSchoolOption")
        })
}

const checkRangeInputs = () => {
    let boolInputsValues: boolean[] = []
    allRangeInfoSpans.forEach((rangeInfoSpan: HTMLSpanElement) => {
        if (rangeInfoSpan.innerText === "") {
            boolInputsValues.push(false)
        } else {
            boolInputsValues.push(true)
        }
    })

    if (!jobInputsRadio[0].checked) {
        boolInputsValues.shift()
    }

    return boolInputsValues
}

const checkCheckboxAndRadioInputs = (): boolean[] => {
    let boolInputsValues: boolean[] = []  
 

    let selectorRadioInputs: (NodeListOf<HTMLInputElement> | null)[] = [
        document.querySelectorAll("input[name=UF]"), 
        document.querySelectorAll("input[name=city]"), 
        document.querySelectorAll("input[name=school]"),
        jobInputsRadio,
        document.querySelectorAll(".jobCheckbox"),
        document.querySelectorAll("input[name=studentIsInteressed]"),
        document.querySelectorAll("input[name=familyHelpsStudent]"),
        document.querySelectorAll("input[name=studentIsInteressedInTheClasses]"),
        document.querySelectorAll(".studyCheckbox"),
        document.querySelectorAll("input[name=bullied]"),
        document.querySelectorAll("input[name=isNeuroDivergent]"),
        document.querySelectorAll("input[name=cognitiveProblems]"),
        document.querySelectorAll("input[name=learningDifficult]"),
        document.querySelectorAll("input[name=isStudentOverWhelmed]")
    ]

    selectorRadioInputs.forEach((radioInputsGroup: NodeListOf<HTMLInputElement> | null) => {
        let boolInputsValuesLength = boolInputsValues.length
        
        radioInputsGroup?.forEach((radioInput: HTMLInputElement) => {
            if (radioInput.checked) {
                boolInputsValues.push(true)
            }
        })

        if (boolInputsValuesLength == boolInputsValues.length) {
            boolInputsValues.push(false)
        }

        if (radioInputsGroup != null && radioInputsGroup.length > 0) {
            let groupName = radioInputsGroup[0].name
            if ((groupName.includes("job") || groupName.includes("wor")) && !jobInputsRadio[0].checked) {
                boolInputsValues.pop()
            }
        }
    })

    return boolInputsValues
}

const checkAllTextAndNumbersInputs = () => {
    let boolInputsValues: boolean[] = []

    boolInputsValues.push(studentNameInput?.value !== "")
    boolInputsValues.push(telephoneInput?.value !== "")

    allNumberInputs.forEach((numberInput: HTMLInputElement) => {
        boolInputsValues.push(numberInput.value !== "")
    })

    return boolInputsValues
}

const checkArrayValues = (booleanArray: boolean[]) => {
    return booleanArray.every(value => value === true)
}

sendFormButton?.addEventListener("click", () => {
    let boolInputsValues = checkRangeInputs()

    boolInputsValues = boolInputsValues.concat(
        checkCheckboxAndRadioInputs(),
        checkAllTextAndNumbersInputs()
    )

    if (checkArrayValues(boolInputsValues)) {
        studentInfoForm?.submit()
        return
    }

    window.alert("O formulário não foi completamente preenchido!")
})

const searchSelectOptions = (
    options: NodeListOf<HTMLLabelElement> | null, 
    filterText: string, 
) => {
    options?.forEach((option: HTMLLabelElement) => {
        if (option.innerText.toLowerCase().indexOf(filterText.toLowerCase()) != -1) {
            option.style.display = "block"
        } else {
            option.style.display = "none"
        }
    })
}


selectors[0]?.addEventListener("click", federalUnitSelectorCallback)
selectors[1]?.addEventListener("click", citySelectorCallback)

for (let i = 0; i < dropdownValuesBoxes.length; i++) {
    dropdownValuesBoxes[i]?.addEventListener("click", () => {
        let show;

        if (selectors[i].style.display == "none") {
            show = true
        } else {
            show = false
        }

        if (show) {
            selectors[i].style.display = "flex"
            return
        }

        selectors[i].style.display = "none"
    })

    selectors[i]?.addEventListener("mouseleave", () => { selectors[i].style.display = "none" })
    selectors[i]?.addEventListener("click", () => {
        dropdownValuesBoxes[i].innerText = getRadioInputsValue(selectorOptionsNames[i]) != "" ? getRadioInputsValue(selectorOptionsNames[i], true) : dropdownValuesBoxesDefaultVales[i] 
    })
    closeDropdownButtons[i]?.addEventListener("click", () => { selectors[i].style.display = "none" })
}

for (let i = 0; i < searchBoxes.length; i++) {
    searchBoxes[i]?.addEventListener("input", () => {
        searchSelectOptions(selectOptions[i], searchBoxes[i].value)
    })
} 

federalUnitSelectorCallback()
