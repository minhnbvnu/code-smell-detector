function updateExampleSettings(event, form, isDefault) {
    // console.log("updateExampleSettings")
    const data = new FormData(form)
    let output = ""
    function updateDownloadSettings(type, feature) {
        const key = feature.split("' ")[0].slice(1)
        const value = feature.split("' ")[1] == "on"
        downloadSettingsCustom[type][key] = value
        if (isDefault) downloadSettingsDefault[type][key] = value
    }
    for (const entry of data) {
        output += `${entry[1]}, `
        if (entry[1].includes("cv")) updateDownloadSettings("alternates", entry[1])
        if (entry[1].includes("ss")) updateDownloadSettings("features", entry[1])

        const label = document.querySelector(`#alt_${entry[0]}`)
        if (label) label.style.fontFeatureSettings = entry[1]
    }
    output = output.slice(0, -2)

    const currentFont = [...new FormData(document.forms["fonts_form"]).values()][0]
    if (currentFont === "CommitMono") codeExample.style.fontFeatureSettings = output
    else codeExample.style.fontFeatureSettings = "normal"

    const customFeatureCode = document.querySelector("#custom_feature_code")
    const shortFeatureCode = output
        .split(", ")
        .filter((f) => f.includes("on"))
        .join(", ")
    customFeatureCode.textContent = `"${shortFeatureCode}"`

    if (event) event.preventDefault()
}