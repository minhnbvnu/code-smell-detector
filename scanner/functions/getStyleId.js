function getStyleId(styleId) {
    if (styleId.match(/\[(.*)\]/)) {
        return styleId.match(/\[(.*)\]/)[1];
    } else {
        return styleId;
    }
}