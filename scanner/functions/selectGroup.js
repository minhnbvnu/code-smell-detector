function selectGroup(group, context, page, callback) {

    var loopChildren = group.children().objectEnumerator();
    var subGroup;
    while (subGroup = loopChildren.nextObject()) {

        if (subGroup.containsLayers() && subGroup.class() != "MSShapeGroup" && subGroup.class() != "MSPage") {

            // log(loopChildren);

            selectSubLayer(subGroup, true);
            context.document.actionsController().actionForID("MSUnionAction").doPerformAction(null);

            // Fix Sketch 45
            if (page.deselectAllLayers) {
                page.deselectAllLayers();
            } else {
                page.changeSelectionBySelectingLayers(nil);
            }

            if (callback && typeof (callback) == "function") {
                callback(1);
            }
        }
    }

}