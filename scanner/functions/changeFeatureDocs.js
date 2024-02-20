function changeFeatureDocs(enable) {
    // console.log("changeFeatureDocs")
    if (enable == "enable") {
        websiteData.enableFeaturesInDocs = true
    } else if (enable == "disable") {
        websiteData.enableFeaturesInDocs = false
    } else if (enable == "switch") {
        websiteData.enableFeaturesInDocs = !websiteData.enableFeaturesInDocs
    }
    const enabled = websiteData.enableFeaturesInDocs
    const allExampleTexts = document.querySelectorAll(".docs_example")
    allExampleTexts.forEach((text) => {
        text.style.fontFeatureSettings = `"${text.dataset.feature}" ${enabled ? 1 : 0}`
    })
    const allSpanOff = document.querySelectorAll(".span_off")
    const allSpanOn = document.querySelectorAll(".span_on")
    if (enabled) {
        allSpanOff.forEach((span) => span.classList.remove("active_feature"))
        allSpanOn.forEach((span) => span.classList.add("active_feature"))
    } else {
        allSpanOff.forEach((span) => span.classList.add("active_feature"))
        allSpanOn.forEach((span) => span.classList.remove("active_feature"))
    }
}