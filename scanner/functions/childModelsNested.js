function childModelsNested(obj) {
    var children;
    if (Array.isArray(obj)) {
        children = obj;
    } else {
        children = Object.keys(obj).map(function(childModelKey) {
            return obj[childModelKey];
        });
    }
    if (children.length === 0) {
        return children;
    }
    if (children[0] instanceof widgets.WidgetModel) {
        // Bottom level (children are leaf nodes)
        return children;
    }
    return _.flatten(children.map(function(child) {
        return childModelsNested(child);
    }), true);
}