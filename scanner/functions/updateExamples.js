function updateExamples(event, form) {
    // console.log("updateExamples")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }

    websiteData.sections.forEach((section) => {
        if (section.name == "customize") {
            section.content.languages.forEach((language, index) => {
                if (language.languageName == output) {
                    codeExample.textContent = language.codeExample
                    let nums = Array.from(new Array(1000), (x, i) => i + 1).join("\n")
                    codeExample.setAttribute("data-before", nums)
                }
            })
        }
    })

    if (event) event.preventDefault()
}