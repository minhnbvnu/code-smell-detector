function runActionForSelection(context, action) {
    var ga = require("../modules/Google_Analytics");
    ga("Layer");
    var document = context.document;
    var selection = context.selection;
    if (selection.count() == 0) {
        document.showMessage("Please select at least 1 layer.");
        return;
    }
    var loopSelection = selection.objectEnumerator();
    var layer;
    while (layer = loopSelection.nextObject()) {
        action(layer);
    }
    document.reloadInspector();
}