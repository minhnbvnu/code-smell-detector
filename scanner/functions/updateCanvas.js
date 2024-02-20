function updateCanvas(selectedGlyphData, selectedFont, displayCharacter, displayName) {
    // initialize canvas
    let CANVAS_SCALE = window.devicePixelRatio
    const canvas = document.querySelector("#canvas")
    let canvasWidth = 60 * canvasScale
    let canvasHeight = 42 * canvasScale
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.width = canvasWidth * CANVAS_SCALE
    canvas.height = canvasHeight * CANVAS_SCALE
    const ctx = canvas.getContext("2d")
    ctx.scale(CANVAS_SCALE, CANVAS_SCALE)

    let GLYPH_SCALE = 0.6
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (selectedGlyphData.path) {
        const CANVAS_GLYPH_COMPOSITION_FILL = [
            {
                type: "outline",
                fill: true,
                color: getCssVar("--text"),
                pointSize: undefined,
            },
        ]
        const CANVAS_GLYPH_COMPOSITION_BEZIER = [
            // {
            // 	type: "outline",
            // 	fill: true,
            // 	color: "rgba(0, 0, 0, 0.1)",
            // 	pointSize: undefined,
            // },
            {
                type: "handles",
                fill: false,
                color: getCssVar("--middle"),
                pointSize: undefined,
            },
            {
                type: "outline",
                fill: false,
                color: getCssVar("--text"),
                pointSize: undefined,
            },
            {
                type: "points",
                fill: true,
                color: getCssVar("--text"),
                pointSize: 10, // size of point on bezier glyph
            },
            {
                type: "handle points",
                fill: true,
                color: getCssVar("--middle"),
                pointSize: 10, // size of handles on bezier glyph
            },
        ]

        const upem = selectedFont?.unitsPerEm || 1000
        const width = 60 * canvasScale

        const yOffset = -45 * canvasScale
        const xOffset = 20 * canvasScale
        const ascender = selectedFont?.tables.os2?.sTypoAscender || 750
        const capHeight = selectedFont?.tables.os2?.sCapHeight || 700
        const xHeight = selectedFont?.tables.os2?.sxHeight
        const baseline = 0
        const descender = selectedFont?.tables.os2?.sTypoDescender || -200
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Ascender", ascender, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Cap Height", capHeight, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "X-height", xHeight || 500, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Baseline", baseline, yOffset)
        drawFontLine(GLYPH_SCALE, ctx, upem, width, "Descender", descender, yOffset)
        drawFontLineVertical(GLYPH_SCALE, ctx, upem, width, 7 * canvasScale, yOffset, ascender, descender)
        drawFontLineVertical(GLYPH_SCALE, ctx, upem, width, 30 * canvasScale, yOffset, ascender, descender)
        drawFontLineVertical(GLYPH_SCALE, ctx, upem, width, 53 * canvasScale, yOffset, ascender, descender)

        ctx.fillStyle = getCssVar("--text")
        ctx.font = `${0.75 * canvasScale}px "CommitMono"`
        ctx.textAlign = "center"
        ctx.fillText(displayName, (30 - 11.5) * canvasScale, 2.75 * canvasScale)
        ctx.fillText(displayName, (30 + 11.5) * canvasScale, 2.75 * canvasScale)

        // make ready transformation matrixes for manipulating paths
        let firstMatrix = new DOMMatrix()
        firstMatrix = firstMatrix.scaleSelf(width / upem)
        let secondMatrix = new DOMMatrix()
        secondMatrix = secondMatrix.scaleSelf(GLYPH_SCALE)
        secondMatrix = secondMatrix.translateSelf(-width * 0.5, -width) // translate to left edge, top
        secondMatrix = secondMatrix.translateSelf((width * 0.5) / GLYPH_SCALE, width / GLYPH_SCALE) // translate to center, baseline
        secondMatrix = secondMatrix.translateSelf(0, (yOffset * width) / upem) // translate yOffset
        secondMatrix = secondMatrix.translateSelf((xOffset * width) / upem, 0) // translate xOffset

        // set initial value for glyph composition based on if bezier is switched on or off
        // let canvasGlyphComposition = bezier ? CANVAS_GLYPH_COMPOSITION_BEZIER : CANVAS_GLYPH_COMPOSITION_FILL

        CANVAS_GLYPH_COMPOSITION_BEZIER.forEach((composite) => {
            const calcPointsize = composite.pointSize * (upem / 1000)
            const firstPath2d = glyphBezier(selectedGlyphData, upem, composite.type, calcPointsize)
            const secondPath2d = new Path2D()
            secondPath2d.addPath(firstPath2d, firstMatrix)
            const finalPath2d = new Path2D()
            finalPath2d.addPath(secondPath2d, secondMatrix)

            if (composite.fill) {
                ctx.fillStyle = composite.color
                ctx.fill(finalPath2d)
            } else {
                ctx.strokeStyle = composite.color
                ctx.stroke(finalPath2d)
            }
        })
        CANVAS_GLYPH_COMPOSITION_FILL.forEach((composite) => {
            secondMatrix = secondMatrix.translateSelf((-2 * xOffset * width) / upem, 0) // translate xOffset

            const calcPointsize = composite.pointSize * (upem / 1000)
            const firstPath2d = glyphBezier(selectedGlyphData, upem, composite.type, calcPointsize)
            const secondPath2d = new Path2D()
            secondPath2d.addPath(firstPath2d, firstMatrix)
            const finalPath2d = new Path2D()
            finalPath2d.addPath(secondPath2d, secondMatrix)

            if (composite.fill) {
                ctx.fillStyle = composite.color
                ctx.fill(finalPath2d)
            } else {
                ctx.strokeStyle = composite.color
                ctx.stroke(finalPath2d)
            }
        })
    }
}