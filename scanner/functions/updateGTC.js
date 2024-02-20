function updateGTC(event, form) {
    // console.log("updateGTC")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }
    websiteData.sections.forEach((section) => {
        if (section.name == "distinct") {
            section.content.gtcDifficulties.forEach((difficulty) => {
                if (difficulty.name == output) {
                    gtc = section.content.gtc[output]
                    setCssVar(["--question-character-size", `${difficulty.size}rem`])
                    buildGTC()
                }
            })
        }
    })

    if (event) event.preventDefault()
}