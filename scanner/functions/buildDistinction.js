function buildDistinction() {
    // console.log("buildDistinction")
    gtcFieldset.innerHTML = ""
    websiteData.sections.forEach((section) => {
        if (section.name == "distinct") {
            section.content.gtcDifficulties.forEach((difficulty, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "difficulty"
                input.id = `difficulty_${difficulty.name}`
                input.classList.add("gtc_difficulty")
                input.value = difficulty.name
                input.dataset.forform = "gtc_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = difficulty.name
                label.setAttribute("for", `difficulty_${difficulty.name}`)
                div.append(input, label)
                gtcFieldset.append(div)
            })
        }
    })
}