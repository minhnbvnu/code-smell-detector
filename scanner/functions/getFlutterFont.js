function getFlutterFont(font) {
    let o = xd.root.pluginData;
    return (o && o.fontMap && o.fontMap[font]) || null;
}