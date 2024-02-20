function clearLensElements(renderer) {
    var textLayer = renderer.$textLayer;
    var lensElements = textLayer.$lenses;
    if (lensElements)
        lensElements.forEach(function(el) {el.remove(); });
    textLayer.$lenses = null;
}