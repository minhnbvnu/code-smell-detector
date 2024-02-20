function buildCode() {
    // console.log("buildCode")
    websiteData.sections.forEach((section) => {
        if (section.name == "code") {
            section.content.characters.forEach((character, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "code"
                input.id = character.name
                input.classList.add("code_character")
                input.value = character.name
                input.dataset.forform = "code_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = character.value
                label.setAttribute("for", character.name)
                div.append(input, label)
                codeFieldset.append(div)

                const p = document.createElement("p")
                p.tabIndex = 0
                p.dataset.edit = "true"
                p.classList.add("code_char")
                p.dataset.char = character.name
                p.textContent = character.description
                p.style.display = "none"
                codeDescription.append(p)
            })
        }
    })
}