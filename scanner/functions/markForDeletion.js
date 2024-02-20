function markForDeletion(layer, elt) {
    if (!elt.cleanableSince) {
        elt.cleanableSince = Date.now();
        layer._cleanableTiles.push(elt);
    }
}