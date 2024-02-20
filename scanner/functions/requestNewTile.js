function requestNewTile(view, scheduler, geometryLayer, metadata, parent, redraw) {
    const command = {
        /* mandatory */
        view,
        requester: parent,
        layer: geometryLayer,
        priority: parent ? 1.0 / (parent.distance + 1) : 100,
        /* specific params */
        metadata,
        redraw,
    };

    geometryLayer.dispatchEvent({ type: C3DTILES_LAYER_EVENTS.ON_TILE_REQUESTED, metadata });

    return scheduler.execute(command);
}