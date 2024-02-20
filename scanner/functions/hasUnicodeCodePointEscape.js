function hasUnicodeCodePointEscape(raw) {
    let match = null

    UNICODE_ESC.lastIndex = 0
    while ((match = UNICODE_ESC.exec(raw)) != null) {
        if (match[1].length % 2 === 1) {
            return true
        }
    }

    return false
}