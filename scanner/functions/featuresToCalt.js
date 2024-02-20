async function featuresToCalt() {
    // const features = ["ss01_arrows", "ss02_less_equal", "ss03_case", "ss04_ellipsis", "ss05_smartkerning"]
    const features = ["ss03_case", "ss04_ellipsis", "ss05_smartkerning"]

    let calt = []

    for await (const feature of features) {
        const fileStream = fs.createReadStream(`../features/${feature}.fea`)

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        })
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        const lines = []

        lines.push(`### feature ${feature} ###`)

        for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.
            // console.log(`Line from file: ${line}`)
            lines.push(line)
        }

        calt.push(lines)
    }

    calt = calt.flat().filter((ln) => !ln.includes("feature") && !ln.includes("} ss"))
    calt = calt.map((ln) => {
        if (ln.includes("lookup")) return ln.split("lookup ").join("lookup _")
        if (ln.includes("} ")) return ln.split("} ").join("} _")
        return ln
    })

    // calt.forEach((ln) => console.log(ln))
    pbcopy(`
feature calt {
    # Contextual Alternates
    # Contains all 'cxxx' features

${calt.join("\n")}

} calt;`)
}