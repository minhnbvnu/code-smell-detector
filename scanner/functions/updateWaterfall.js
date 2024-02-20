function updateWaterfall() {
    // console.log("updateWaterfall")
    const waterfallContainer = document.querySelector("#waterfall")
    waterfallContainer.innerHTML = ""
    waterfall.sizes.forEach((size) => {
        const div = document.createElement("div")
        div.id = `size_${size}`

        const desc = document.createElement("p")
        desc.classList.add("waterfall_desc")
        desc.textContent = `${size}rem\n${Math.round(size * rem * 100) / 100}px`

        const textsContainer = document.createElement("div")
        textsContainer.classList.add("waterfall_texts_container")
        waterfall.texts.forEach((text) => {
            const div2 = document.createElement("div")
            const p = document.createElement("p")
            p.classList.add("waterfall_text")
            p.style.fontSize = `${Math.round(size * rem * 100) / 100}px`
            p.textContent = text
            div2.append(p)
            textsContainer.append(div2)
        })
        div.append(desc, textsContainer)

        waterfallContainer.append(div)
    })
}