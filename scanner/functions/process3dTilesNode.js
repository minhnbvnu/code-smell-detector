function process3dTilesNode(cullingTest = $3dTilesCulling, subdivisionTest = $3dTilesSubdivisionControl) {
    return function _process3dTilesNodes(context, layer, node) {
        // early exit if parent's subdivision is in progress
        if (node.parent.pendingSubdivision && !node.parent.additiveRefinement) {
            node.visible = false;
            return undefined;
        }


        // do proper culling
        const isVisible = cullingTest ? (!cullingTest(layer, context.camera, node, node.matrixWorld)) : true;
        node.visible = isVisible;

        if (isVisible) {
            if (node.cleanableSince) {
                layer._cleanableTiles.splice(layer._cleanableTiles.indexOf(node), 1);
                node.cleanableSince = undefined;
            }

            let returnValue;
            if (node.pendingSubdivision || subdivisionTest(context, layer, node)) {
                subdivideNode(context, layer, node, cullingTest);
                // display iff children aren't ready
                setDisplayed(node, node.pendingSubdivision || node.additiveRefinement);
                returnValue = getChildTiles(node);
            } else {
                setDisplayed(node, true);

                for (const n of getChildTiles(node)) {
                    n.visible = false;
                    markForDeletion(layer, n);
                }
            }
            return returnValue;
        }

        markForDeletion(layer, node);
    };
}