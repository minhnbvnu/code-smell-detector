function buildDocs() {
    // console.log("buildDocs")
    customizeContent.features.forEach((feature) => {
        const sizes = [
            [3, 4],
            [1.5, 2],
            [0.5, 1],
        ]
        const container = document.createElement("div")
        const h2 = document.createElement("h2")
        const featureDescriptionWithSpan = feature.description
            .split("|")
            .map((l) =>
                l == "OFF" || l == "DEF"
                    ? `<span class="span_off${
                          !feature.on ? " active_feature" : ""
                      }" onclick="changeFeatureDocs('disable')">[${l}]</span>`
                    : l == "ON" || l == "ALT"
                    ? `<span class="span_on${
                          feature.on ? " active_feature" : ""
                      }" onclick="changeFeatureDocs('enable')">[${l}]</span>`
                    : l,
            )
            .join("")
        h2.innerHTML = featureDescriptionWithSpan
        h2.tabIndex = 0
        h2.dataset.edit = "true"
        const p = document.createElement("p")
        p.textContent = `Default: ${feature.on ? "ON" : "OFF"}. Feature in variable font: "${feature.feature}".`
        container.append(h2, p)
        sizes.forEach((size) => {
            const exampleText = document.createElement("p")
            exampleText.textContent = feature.docsExample
            exampleText.classList.add("docs_example", `docs_${feature.type}`)
            exampleText.dataset.feature = feature.feature
            exampleText.style.fontSize = `${size[0]}rem`
            exampleText.style.lineHeight = `${size[1]}rem`
            container.append(exampleText)
        })
        const br1 = document.createElement("br")
        const br2 = document.createElement("br")
        container.append(br1, br2)
        if (feature.type == "feature") {
            featuresContainerDocs.append(container)
        }
        if (feature.type == "alternate") {
            alternatesContainerDocs.append(container)
        }
    })
    const charset = document.querySelector("#charset")
    const tunedCharset = docsContent.charset.split("").join(" ")
    docsContent.charset.split("").forEach((char) => {
        const span = document.createElement("p")
        span.classList.add("charset_letter")
        span.textContent = char
        charset.append(span)
    })
    // charset.textContent = tunedCharset

    const languageSupport = document.querySelector("#language_support")
    docsContent.supportedLanguages.forEach((language) => {
        const p = document.createElement("p")
        p.classList.add("language_support")
        p.textContent = language
        languageSupport.append(p)
    })

    updateDocs(null, docsForm)
}