function configEquals(a, b) {
    for (var i = 0; i < a.colors.ansi.length; i++) {
        if (a.colors.ansi[i] !== b.colors.ansi[i]) {
            return false;
        }
    }
    return a.fontFamily === b.fontFamily &&
        a.fontSize === b.fontSize &&
        a.fontWeight === b.fontWeight &&
        a.fontWeightBold === b.fontWeightBold &&
        a.allowTransparency === b.allowTransparency &&
        a.scaledCharWidth === b.scaledCharWidth &&
        a.scaledCharHeight === b.scaledCharHeight &&
        a.colors.foreground === b.colors.foreground &&
        a.colors.background === b.colors.background;
}