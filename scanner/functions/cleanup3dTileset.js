function cleanup3dTileset(layer, n, depth = 0) {
    // If this layer is not using additive refinement, we can only
    // clean a tile if all its neighbours are cleaned as well because
    // a tile can only be in 2 states:
    //   - displayed and no children displayed
    //   - hidden and all of its children displayed
    // So here we implement a conservative measure: if T is cleanable
    // we actually only clean its children tiles.
    const canCleanCompletely = n.additiveRefinement || depth > 0;

    for (let i = 0; i < n.children.length; i++) {
        // skip non-tiles elements
        if (!n.children[i].content) {
            if (canCleanCompletely) {
                ObjectRemovalHelper.removeChildrenAndCleanupRecursively(n.children[i].layer, n.children[i]);
            }
        } else {
            cleanup3dTileset(layer, n.children[i], depth + 1);
        }
    }


    if (canCleanCompletely) {
        if (n.dispose) {
            n.dispose();
        }
        delete n.content;
        layer.tileset.tiles[n.tileId].loaded = false;
        n.remove(...n.children);

        // and finally remove from parent
        if (depth == 0 && n.parent) {
            n.parent.remove(n);
        }
    } else {
        const tiles = getChildTiles(n);
        n.remove(...tiles);
    }
}