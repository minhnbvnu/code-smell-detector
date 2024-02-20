function safeFrustumPlanes(camera, center, radius, allowZoom) {
    allowZoom = allowZoom === undefined ? 20 : allowZoom;
    // Find distance from camera to edges of sphere
    var dist = camera.position.distanceTo(center);
    var nearEdge = dist - radius;
    var farEdge = dist + radius;

    // Set near/far sufficiently far from edge of sphere to allow some zooming
    camera.near = (1 / allowZoom) * nearEdge;
    camera.far = allowZoom * farEdge;

    // Bound near plane away from zero
    camera.near = Math.max(camera.near, 0.001 * radius);
}