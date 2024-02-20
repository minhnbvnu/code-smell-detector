function updateFamiliar(event, form) {
    // console.log("updateFamiliar")
    buildFamiliar()
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = entry[1]
    }
    websiteData.sections.forEach((section) => {
        if (section.name == "familiar") {
            section.content.timeline.forEach((example) => {
                const exampleContainer = familiarContainer.querySelector(`#${example.name}`)
                if (exampleContainer.dataset.name == output) {
                    exampleContainer.style.display = "block"
                } else {
                    exampleContainer.style.display = "none"
                }
            })
        }
    })
    event.preventDefault()
}