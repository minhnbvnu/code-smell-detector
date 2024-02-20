function buildNav() {
    // console.log("buildNav")
    websiteData.sections.forEach((section, index) => {
        const div = document.createElement("div")
        const input = document.createElement("input")
        input.type = "radio"
        input.name = "nav_form"
        input.id = section.name
        input.classList.add("nav_section_input")
        input.value = `section_${index + 1}`
        input.dataset.forform = "nav_form"
        // input.tabIndex = 0
        if (index == 0) {
            input.setAttribute("checked", "true")
        }
        const label = document.createElement("label")
        label.for = section.name
        label.textContent = `${index + 1 < 10 ? `0${index + 1}` : index + 1} ${capitalize(section.name)}`
        label.classList.add("nav_element")
        label.dataset.sectionIndex = index + 1
        label.setAttribute("for", section.name)
        div.append(input, label)
        navForm.append(div)
    })
}