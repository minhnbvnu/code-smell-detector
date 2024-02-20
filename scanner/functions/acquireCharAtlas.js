function acquireCharAtlas(terminal, colors, scaledCharWidth, scaledCharHeight) {
    var newConfig = generateConfig(scaledCharWidth, scaledCharHeight, terminal, colors);
    for (var i = 0; i < charAtlasCache.length; i++) {
        var entry = charAtlasCache[i];
        var ownedByIndex = entry.ownedBy.indexOf(terminal);
        if (ownedByIndex >= 0) {
            if (configEquals(entry.config, newConfig)) {
                return entry.bitmap;
            }
            else {
                if (entry.ownedBy.length === 1) {
                    charAtlasCache.splice(i, 1);
                }
                else {
                    entry.ownedBy.splice(ownedByIndex, 1);
                }
                break;
            }
        }
    }
    for (var i = 0; i < charAtlasCache.length; i++) {
        var entry = charAtlasCache[i];
        if (configEquals(entry.config, newConfig)) {
            entry.ownedBy.push(terminal);
            return entry.bitmap;
        }
    }
    var canvasFactory = function (width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    var charAtlasConfig = {
        scaledCharWidth: scaledCharWidth,
        scaledCharHeight: scaledCharHeight,
        fontSize: terminal.options.fontSize,
        fontFamily: terminal.options.fontFamily,
        fontWeight: terminal.options.fontWeight,
        fontWeightBold: terminal.options.fontWeightBold,
        background: colors.background,
        foreground: colors.foreground,
        ansiColors: colors.ansi,
        devicePixelRatio: window.devicePixelRatio,
        allowTransparency: terminal.options.allowTransparency
    };
    var newEntry = {
        bitmap: CharAtlasGenerator_1.generateCharAtlas(window, canvasFactory, charAtlasConfig),
        config: newConfig,
        ownedBy: [terminal]
    };
    charAtlasCache.push(newEntry);
    return newEntry.bitmap;
}