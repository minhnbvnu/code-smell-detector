function copyGuideToPasteboard(context, layer) {

    var document = context.document;

    if (
        layer.horizontalRulerData().guides().count() == 0 &&
        layer.verticalRulerData().guides().count() == 0
    ) {
        document.showMessage("No guide setting in \"" + layer.name() + "\".");
        return;
    } else {
        var horizontalRulerData = layer.horizontalRulerData().guides().componentsJoinedByString(",");
        var verticalRulerData = layer.verticalRulerData().guides().componentsJoinedByString(",");
        var guideSetting = '{' +
            '"horizontalRulerData":[' + horizontalRulerData + '],' +
            '"verticalRulerData":[' + verticalRulerData + ']}';
        copyStringToPasteboard(context, guideSetting);
    }
}