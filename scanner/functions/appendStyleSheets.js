function appendStyleSheets() {
    // console.log("appendStyleSheets")
    const stylesheetIndexes = [
        "style",
        "mobile",
        "non_essential",
        "section_1",
        "section_2",
        "section_3",
        "section_4",
        "section_5",
        "section_6",
        "section_7",
        "section_8",
        "section_9",
        "section_10",
    ]
    const head = document.querySelector("head")
    stylesheetIndexes.forEach((stylesheet, index) => {
        const link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", `src/css/${stylesheet}.css`)
        head.append(link)
        checkCssLoadIntervalIDs[index] = setInterval(() => {
            const cssLoaded = Boolean(link.sheet)
            if (cssLoaded) {
                // console.log(`${stylesheet} CSS loaded`)
                clearInterval(checkCssLoadIntervalIDs[index])
                checkCssLoadIntervalIDs[index] = null
                if (index == 3) {
                    allCssLoaded = true
                    // console.log("ALL CSS LOADED")
                }
            }
        }, 100)
    })
}