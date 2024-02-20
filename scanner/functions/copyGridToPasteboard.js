function copyGridToPasteboard(context, layer) {
    var gridSetting = {
        "girdSize": layer.grid().gridSize(),
        "thickGridTimes": layer.grid().thickGridTimes(),
        "isEnabled": layer.grid().isEnabled()
    };
    copyStringToPasteboard(context, JSON.stringify(gridSetting));
}