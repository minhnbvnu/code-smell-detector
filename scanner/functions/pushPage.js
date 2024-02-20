function pushPage(key) {
    // console.log("push page", key)
    const x = websiteData.pushPage.coordinates.x
    const y = websiteData.pushPage.coordinates.y
    const scale = websiteData.pushPage.scale
    const dist = websiteData.pushPage.distance

    // move left
    if (key == "w") {
        main.style.transform = `translate(${x}px, ${y + dist}px)`
        websiteData.pushPage.coordinates.y += dist
    }

    // move left
    else if (key == "a") {
        main.style.transform = `translate(${x + dist}px, ${y}px)`
        websiteData.pushPage.coordinates.x += dist
    }

    // move down
    else if (key == "s") {
        main.style.transform = `translate(${x}px, ${y - dist}px)`
        websiteData.pushPage.coordinates.y -= dist
    }

    // move right
    else if (key == "d") {
        main.style.transform = `translate(${x - dist}px, ${y}px)`
        websiteData.pushPage.coordinates.x -= dist
    }

    // zoom in
    else if (key == "+") {
        rem = (+rem * 0.75 + 1) / 0.75
        document.documentElement.style.fontSize = `${rem}px`
        updateWaterfall()
        document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
        showHideChangeSettings(`Base font size: ${rem * 0.75}px`)
    }

    // zoom out
    else if (key == "-") {
        rem = (+rem * 0.75 - 1) / 0.75
        document.documentElement.style.fontSize = `${rem}px`
        updateWaterfall()
        document.querySelector("#canvas").style.transform = `scale(${rem / 16})`
        showHideChangeSettings(`Base font size: ${rem * 0.75}px`)
    }

    // reset transforms
    else if (key == "r") {
        main.style.transform = `translate(0)`
        websiteData.pushPage.coordinates.x = 0
        websiteData.pushPage.coordinates.y = 0
        websiteData.pushPage.scale = 1
        document.querySelector("#canvas").style.transform = "scale(1)"
        rem = 16
        document.documentElement.style.fontSize = "16px"
        websiteData.weight = 400
        document.querySelector("body").style.fontVariationSettings = `"wght" 400`
        document.forms["weight_form"][`weight_${websiteData.weight}`].checked = true
        document.forms["letter_spacing_form"][`letter_spacing_${websiteData.letterSpacing}`].checked = true
        document.forms["line_height_form"][`line_height_${websiteData.lineHeight}`].checked = true
        codeExample.style.fontFamily = "CommitMono"
        document.querySelector("#font_name").value = ""
        document.querySelector("#font_name + p").textContent = ""
        document.querySelector("#custom_name").textContent = "CommitMono-YourName"
        websiteData.fontName = "CommitMono"
        if (typeof updateCodeFont === "function") updateCodeFont()
        if (typeof updateWaterfall === "function") updateWaterfall()
        if (typeof buildExample === "function") buildExample()
        if (typeof updateWeight === "function") updateWeight(null, weightForm)
        if (typeof updateLetterSpacing === "function") updateLetterSpacing(null, letterSpacingForm)
        if (typeof updateLineHeight === "function") updateLineHeight(null, lineHeightForm)
    }
}