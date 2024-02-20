function screenCoordsToNodeId(view, tileLayer, viewCoords, radius = 0) {
    const dim = view.mainLoop.gfxEngine.getWindowSize();

    viewCoords = viewCoords || new THREE.Vector2(Math.floor(dim.x / 2), Math.floor(dim.y / 2));

    const restore = tileLayer.level0Nodes.map(n => RenderMode.push(n, RenderMode.MODES.ID));

    const buffer = view.mainLoop.gfxEngine.renderViewToBuffer(
        { camera: view.camera, scene: tileLayer.object3d },
        {
            x: viewCoords.x - radius,
            y: viewCoords.y - radius,
            width: 1 + radius * 2,
            height: 1 + radius * 2,
        });

    restore.forEach(r => r());

    const ids = [];

    traversePickingCircle(radius, (x, y) => {
        const idx = (y * 2 * radius + x) * 4;
        const data = buffer.slice(idx, (idx + 4) || undefined);
        depthRGBA.fromArray(data).divideScalar(255.0);
        const unpack = unpack1K(depthRGBA, 256 ** 3);

        const _id = Math.round(unpack);
        if (!ids.includes(_id)) {
            ids.push(_id);
        }
    });
    return ids;
}