function loadFont(name, json, jsonURL) {
    if (json.format !== '20211015') {
        throw 'Font ' + jsonURL + ' in obsolete format. Use tools/font-update.py to upgrade';
    }
    const pngURL = makeURLAbsolute(jsonURL, json.url);

    let font = assetCache[jsonURL];
    if (font) {
        // Make sure the index is updated when pulling from the cache
        if (fontArray.indexOf(font) === -1) {
            font.$index[0] = fontArray.length;
            fontArray.push(font);
        } else {
            console.assert(fontArray.indexOf(font) === font.$index[0]);
        }

        // Print faux loading messages
        onLoadFileStart(pngURL);
        onLoadFileComplete(pngURL);
        return font;
    }

    // Load from disk and create a new object, and then store in the cache
    assetCache[jsonURL] = font = {
        $name:     name,
        $type:     'font',
        $url:      pngURL,
        $json:     json,
        $jsonURL:  jsonURL,
        $index:    [fontArray.length]
    };

    fontArray.push(font);
    const forceReload = computeForceReloadFlag(pngURL);

    onLoadFileStart(pngURL);
    loadManager.fetch(pngURL, 'image', getBinaryImageData, function (srcMask, image) {
        onLoadFileComplete(pngURL);
        
        const borderSize = 1;
        const shadowSize = parseInt(json.shadowSize || 1);

        packFont(font, borderSize, shadowSize, json.baseline, json.char_size, Object.freeze({x: json.letter_spacing.x, y: json.letter_spacing.y}), srcMask, true, json.char_min_width);
        Object.freeze(font);
    }, loadFailureCallback, loadWarningCallback, forceReload);

    return font;
}