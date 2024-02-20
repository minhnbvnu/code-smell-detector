function copyLayoutToPasteboard(context, layer) {
    var layoutSetting = {
        "columnWidth": layer.layout().columnWidth(),
        "drawHorizontal": layer.layout().drawHorizontal(),
        "drawHorizontalLines": layer.layout().drawHorizontalLines(),
        "drawVertical": layer.layout().drawVertical(),
        "gutterHeight": layer.layout().gutterHeight(),
        "gutterWidth": layer.layout().gutterWidth(),
        "guttersOutside": layer.layout().guttersOutside(),
        "horizontalOffset": layer.layout().horizontalOffset(),
        "isEnabled": layer.layout().isEnabled(),
        "numberOfColumns": layer.layout().numberOfColumns(),
        "rowHeightMultiplication": layer.layout().rowHeightMultiplication(),
        "totalWidth": layer.layout().totalWidth()
    };
    copyStringToPasteboard(context, JSON.stringify(layoutSetting));
}