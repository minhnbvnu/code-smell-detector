function selectTileAt(view, mouseOrEvt, showInfo = true) {
    if (selectedNode) {
        selectedNode.material.overlayAlpha = 0;
        selectedNode.material.showOutline = view.tileLayer.showOutline;
        view.notifyChange(selectedNode);
    }

    const picked = view.tileLayer.pickObjectsAt(view, mouseOrEvt);
    selectedNode = picked.length ? picked[0].object : undefined;

    if (selectedNode) {
        if (showInfo) {
            // eslint-disable-next-line no-console
            console.info(selectedNode);
        }
        selectedNode.material.overlayAlpha = 0.5;
        selectedNode.material.showOutline = true;
        view.notifyChange(selectedNode);
    }
    return selectedNode;
}