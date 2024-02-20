function getFontFaceRules(family, foundries, options) {
    let fontFaceRules = [];
    const font = getFont(family, foundries, options);

    const variants = options.variants;

    // conditionally return early if no font is found
    if (!font) {
        return fontFaceRules;
    }

    if (variants && variants[family] && !options.hosted.length) {
        Object.keys(variants[family]).forEach(key => {
            const variant = variants[family][key];
            const { weight, style, stretch } = splitValue(key);
            const formats = variant[0]
                ? variant[0].replace(/\W+/g, ' ').split(' ')
                : options.formats;
            const ranges = getUnicodeRange(font, variant[1]);
            const googleWeights = font.variants[style];

            if (googleWeights && googleWeights[weight]) {
                fontFaceRules = generateFont(
                    family,
                    fontFaceRules,
                    {
                        style,
                        urls: googleWeights[weight],
                        weight,
                        formats,
                        ranges,
                        stretch,
                        display: options.display
                    },
                    options
                );
            }
        });
    } else {
        // for each font style
        Object.keys(font.variants).forEach(style => {
            // set the font weights
            const weights = font.variants[style];
            // for each font weight
            Object.keys(weights).forEach(weight => {
                const urls = weights[weight];
                fontFaceRules = generateFont(
                    family,
                    fontFaceRules,
                    {
                        style,
                        urls,
                        weight,
                        formats: null,
                        ranges: null,
                        stretch: null,
                        display: options.display
                    },
                    options
                );
            });
        });
    }

    return fontFaceRules;
}