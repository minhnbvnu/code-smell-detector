function updateWeight(event, form) {
    // console.log("updateWeight")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = +entry[1]
    }

    downloadSettingsCustom.weight = output
    websiteData.weight = output
    document.querySelector("body").style.fontVariationSettings = `"wght" ${websiteData.weight}, "ital" ${
        websiteData.italic ? "1" : "0"
    }`

    console.log(downloadSettingsCustom)

    if (event) event.preventDefault()
}