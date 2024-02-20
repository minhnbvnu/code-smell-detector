function updateFontName(event, form) {
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = entry[1]
    }
    const customName = document.querySelector("#custom_name")
    const suffix = output ? output : ""
    const regex = /^[\w-_]*$/
    const label = document.querySelector("#font_name + p")
    if (output.match(regex)) {
        downloadSettingsCustom.fontName = output
        label.textContent = "✓ Valid name."
        customName.textContent = `CommitMono${suffix}`
        websiteData.fontName = `CommitMono${suffix}`
    } else {
        downloadSettingsCustom.fontName = ""
        label.textContent = "✕ Invalid name, use: A-z 0-9 _ -"
        customName.textContent = `CommitMonoYourName`
        websiteData.fontName = `CommitMono`
    }

    if (event) event.preventDefault()
}