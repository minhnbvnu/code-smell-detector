function setFlutterFont(xdFont, flutterFont) {
    let o = xd.root.pluginData || {};
    if (!o.fontMap) { o.fontMap = {}; }
    o.fontMap[xdFont] = flutterFont;
    xd.root.pluginData = o;
}