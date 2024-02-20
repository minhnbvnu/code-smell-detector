function updateLetterSpacing(event, form) {
    // console.log("updateWeight")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = +entry[1]
    }
    downloadSettingsCustom.letterSpacing = output
    websiteData.letterSpacing = output
    codeExample.style.letterSpacing = `${output / 100}em`

    if (event) event.preventDefault()
}