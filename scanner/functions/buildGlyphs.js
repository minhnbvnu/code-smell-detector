function buildGlyphs(g) {
    return g
        .split(", ")
        .map((gl) => gl.split("=")[0])
        .join(", ")
}