function getModelScene(model) {
    var obj = model.obj;
    while (obj.parent) {
        obj = obj.parent;
    }
    if (obj.type === 'Scene') {
        return obj.ipymodel;
    }
    return null;
}