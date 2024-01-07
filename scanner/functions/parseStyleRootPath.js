function parseStyleRootPath(style) {
    if (style.symbol) {
        style = [style];
    }
    if (Array.isArray(style)) {
        return style;
    }
    let root = style['$root'];
    let iconset = style['$iconset'];
    style = style.style;
    if (root || iconset) {
        if (root && root[root.length - 1] === '/') {
            root = root.substring(0, root.length - 1);
        }
        if (iconset && iconset[iconset.length - 1] === '/') {
            iconset = iconset.substring(0, iconset.length - 1);
        }
        const replacer = function replacer(match) {
            if (match === '{$root}') {
                return root;
            } else if (match === '{$iconset}') {
                return iconset;
            }
            return null;
        };
        convertStylePath(style, replacer);
    }
    return style;
}