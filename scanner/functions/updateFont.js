function updateFont(event, form) {
    // console.log("updateFont")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }

    if (output !== "CommitMono") codeExample.style.fontFeatureSettings = "normal"
    else codeExample.style.fontFeatureSettings = [...new FormData(exampleSettingsForm).values()].join(", ")

    let fontInDocument = false
    document.fonts.forEach((font) => (font.family == output ? (fontInDocument = true) : null))

    if (!fontInDocument) {
        const input = document.querySelector(`input[value="${output}"]`)
        input.classList.add("loading_font")
        const outputFont = new FontFace(output, `url(/src/fonts/other/${output}.woff2)`, {
            style: "normal",
            weight: "400",
        })
        document.fonts.add(outputFont)
        outputFont.load()
        document.fonts.ready.then(() => {
            codeExample.style.fontFamily = output
            input.classList.remove("loading_font")
        })
    } else {
        codeExample.style.fontFamily = output
    }

    if (event) event.preventDefault()
}