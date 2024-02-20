function applyToNodeFirstMaterial(view, root, layer, cb) {
    root.traverse((object) => {
        if (object.material && object.layer === layer) {
            cb(object.material);
        }
    });
    view.notifyChange();
}