function getShebangInfo(sourceCode) {
    const m = SHEBANG_PATTERN.exec(sourceCode.text)

    return {
        bom: sourceCode.hasBOM,
        cr: Boolean(m && m[2]),
        length: (m && m[0].length) || 0,
        shebang: (m && m[1] && `${m[1]}\n`) || "",
    }
}