async function updateCodeFont() {
    // console.log("updateCodeFont")
    opentype
        .load(
            `/src/fonts/fontlab/CommitMono${versionOfCommitMono}-${websiteData.weight}${
                websiteData.italic ? "Italic" : "Regular"
            }.otf`
        )
        .then((font) => {
            // // console.log(font)
            commitMonoFont = font
            updateCode(null, codeForm)
        })
        .catch((err) => console.log(err))

    //     Promise.all([
    //         opentype.load("src/fonts/other/CascadiaCode-Regular.otf"),
    //         opentype.load("src/fonts/other/CascadiaCode-Italic.otf"),
    //         opentype.load("src/fonts/other/CascadiaCode-Bold.otf"),
    //         opentype.load("src/fonts/other/CascadiaCode-BoldItalic.otf"),
    //         opentype.load("src/fonts/other/CommitMono-400-Regular.otf"),
    //         opentype.load("src/fonts/other/CommitMono-400-Italic.otf"),
    //         opentype.load("src/fonts/other/CommitMono-700-Regular.otf"),
    //         opentype.load("src/fonts/other/CommitMono-700-Italic.otf"),
    //     ]).then((res) => {
    //         res.forEach((font) => {
    //             const { fontFamily, fontSubfamily, fullName, postScriptName } = font.names.windows
    //             console.log(`
    // fontFamily: ${fontFamily?.en}
    // fontSubfamily: ${fontSubfamily?.en}
    // fullName: ${fullName?.en}
    // postScriptName: ${postScriptName?.en}`)
    //         })
    //     })
}