async function downloadFont(kindOfDownload, button) {
    // console.log("downloadFont")

    // detect safari
    const userAgentString = navigator.userAgent || "."
    let usingChrome = userAgentString.indexOf("Chrome") > -1 || false
    let usingSafari = userAgentString.indexOf("Safari") > -1 || false
    if (usingChrome && usingSafari) usingSafari = false

    // block download if from Safari since zip is corrupted
    if (usingSafari) {
        button.classList.remove("loaded", "error", "safari")
        button.classList.add("loading")
        setTimeout(() => {
            button.classList.remove("loading")
            button.classList.add("safari")
        }, 500)
    } else {
        if (!downloadStarted) {
            downloadStarted = true
            button.classList.remove("loaded", "error", "safari")
            button.classList.add("loading")

            let allSettings = {}
            if (kindOfDownload === "dev") {
                allSettings.regular = { ...downloadSettingsCustom, style: "Regular" }
                allSettings.italic = {
                    ...downloadSettingsCustom,
                    style: "Italic",
                    italic: true,
                }
                allSettings.bold = { ...downloadSettingsCustom, style: "Bold", weight: 700 }
                allSettings.bolditalic = {
                    ...downloadSettingsCustom,
                    style: "Bold Italic",
                    italic: true,
                    weight: 700,
                }
            }
            if (kindOfDownload === "default") {
                allSettings.regular = { ...downloadSettingsDefault, style: "Regular" }
                allSettings.italic = {
                    ...downloadSettingsDefault,
                    style: "Italic",
                    italic: true,
                }
                allSettings.bold = { ...downloadSettingsDefault, style: "Bold", weight: 700 }
                allSettings.bolditalic = {
                    ...downloadSettingsDefault,
                    style: "Bold Italic",
                    italic: true,
                    weight: 700,
                }
            }
            if (kindOfDownload === "design") {
                for (let weight = 200; weight <= 700; weight += 25) {
                    allSettings[weight + "Regular"] = {
                        ...downloadSettingsCustom,
                        style: weight + "Regular",
                        weight,
                        italic: false,
                    }
                    allSettings[weight + "Italic"] = {
                        ...downloadSettingsCustom,
                        style: weight + "Italic",
                        weight,
                        italic: true,
                    }
                }
            }

            Promise.all(Object.values(allSettings).map((settings) => makeCustomFont(settings)))
                .then((resolve) => getZipFileBlob(kindOfDownload, resolve))
                .then((resolve) => initializeDownload(button, resolve))
                .catch((error) => catchError(button, error))
        }
    }
}