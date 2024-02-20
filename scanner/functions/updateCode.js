function updateCode(event, form) {
    // console.log("updateCode")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }

    let displayCharacter = ""
    let displayName = ""
    websiteData.sections.forEach((section) => {
        if (section.name == "code") {
            section.content.characters.forEach((character, index) => {
                if (character.name == output) {
                    displayCharacter = character.value
                    displayName = character.name
                    const ps = document.querySelectorAll(".code_char")
                    ps.forEach((p) =>
                        p.dataset.char == character.name ? (p.style.display = "block") : (p.style.display = "none")
                    )
                }
            })
        }
    })

    let selectedGlyphData
    if (commitMonoFont) {
        Object.values(commitMonoFont.glyphs.glyphs).forEach((glyph) => {
            if (glyph.name == output) selectedGlyphData = glyph
        })
        updateCanvas(selectedGlyphData, commitMonoFont, displayCharacter, displayName)
    }

    if (event) event.preventDefault()
}