function buildExample() {
    // console.log("buildExample")
    websiteData.sections.forEach((section) => {
        if (section.name == "customize") {
            fontsFieldset.innerHTML = ""
            section.content.fonts.forEach((font, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "font"
                input.id = font.id
                input.classList.add("example_font")
                input.value = font.cssName
                input.dataset.forform = "fonts_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = font.name
                label.setAttribute("for", font.id)
                div.append(input, label)
                fontsFieldset.append(div)
            })

            exampleFieldset.innerHTML = ""
            section.content.languages.forEach((language, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "language"
                input.id = language.languageName
                input.classList.add("example_language")
                input.value = language.languageName
                input.dataset.forform = "examples_form"
                // input.tabIndex = 0
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = language.languageName
                label.setAttribute("for", language.languageName)
                div.append(input, label)
                exampleFieldset.append(div)
            })

            weightFieldset.innerHTML = ""
            section.content.weights.forEach((weight, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "weight"
                input.id = `weight_${weight}`
                input.classList.add("example_weight")
                input.value = weight
                input.dataset.forform = "weight_form"
                if (weight == 400) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = weight
                label.setAttribute("for", `weight_${weight}`)
                div.append(input, label)
                weightFieldset.append(div)
            })

            letterSpacingFieldset.innerHTML = ""
            const ls = section.content.letterSpacings
            for (let value = ls.min; value <= ls.max; value += ls.step) {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "letterSpacing"
                input.id = `letter_spacing_${value}`
                input.classList.add("example_letter_spacing")
                input.value = value
                input.dataset.forform = "letter_spacing_form"
                if (value == ls.value) input.setAttribute("checked", "true")
                const label = document.createElement("label")
                label.textContent = `${value}%`
                label.setAttribute("for", `letter_spacing_${value}`)
                div.append(input, label)
                letterSpacingFieldset.append(div)
            }

            lineHeightFieldset.innerHTML = ""
            const lh = section.content.lineHeights
            for (let val = lh.min; val <= lh.max + 0.01; val += lh.step) {
                const value = Math.round(val * 1000) / 1000
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "lineHeight"
                input.id = `line_height_${value}`
                input.classList.add("example_line_height")
                input.value = value
                input.dataset.forform = "line_height_form"
                if (value == lh.value) input.setAttribute("checked", "true")
                const label = document.createElement("label")
                label.textContent = value
                label.setAttribute("for", `line_height_${value}`)
                div.append(input, label)
                lineHeightFieldset.append(div)
            }

            featuresContainer.innerHTML = ""
            alternatesContainer.innerHTML = ""
            section.content.features.forEach((feature, index) => {
                const fieldset = document.createElement("fieldset")
                const duo = [0, 0]
                const p = document.createElement("p")
                p.textContent = `${feature.feature}: ${feature.label}`
                p.id = `alt_${feature.name}`
                fieldset.append(p)
                duo.forEach((_, index) => {
                    const div = document.createElement("div")
                    const input = document.createElement("input")
                    input.type = "radio"
                    input.name = feature.name
                    input.id = `${feature.feature}_${!!index}`
                    input.value = `'${feature.feature}' ${index == 0 ? "off" : "on"}`
                    input.dataset.forform = "examplesettings_form"
                    if (!feature.on && index == 0) input.setAttribute("checked", "true")
                    if (feature.on && index == 1) input.setAttribute("checked", "true")
                    const label = document.createElement("label")
                    if (feature.type == "feature") label.textContent = index == 0 ? "OFF" : "ON"
                    if (feature.type == "alternate") label.textContent = index == 0 ? "DEF" : "ALT"
                    label.setAttribute("for", `${feature.feature}_${!!index}`)
                    div.append(input, label)
                    fieldset.append(div)
                })
                if (feature.type == "feature") featuresContainer.append(fieldset)
                else alternatesContainer.append(fieldset)
            })
        }
    })

    updateExamples(null, exampleForm)
    updateExampleSettings(null, exampleSettingsForm, true)
}