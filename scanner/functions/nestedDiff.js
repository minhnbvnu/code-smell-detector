function nestedDiff(newObj, oldObj) {
    var diff;
    if (Array.isArray(newObj)) {
        diff = arrayDiff(newObj, oldObj);
    } else {
        diff = dictDiff(newObj, oldObj);
    }
    var all = [...diff.added, ...diff.removed, ...diff.kept];
    if (all.length === 0) {
        return all;
    }
    if (all[0] instanceof widgets.WidgetModel) {
        // Bottom level
        return diff;
    }
    var ret = {
        added: childModelsNested(diff.added),
        removed: childModelsNested(diff.removed),
    };
    return ret;
}