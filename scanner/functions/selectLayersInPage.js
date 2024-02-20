function selectLayersInPage(parent, context, page, callback) {

    var totalCount = 0;

    if (
        parent.containsLayers()
    ) {
        selectGroup(parent, context, page, function (count) {
            totalCount++;
        });
    }

    if (callback && typeof (callback) == "function") {
        callback(totalCount);
    }

}