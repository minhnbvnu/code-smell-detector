function shrinkFrustumPlanes(camera, center, radius, distOffset) {
    distOffset = distOffset === undefined ? 0.1 : distOffset;
    // distOffset = 0.1  -->  10% of radius

    // Find distance from camera to edges of sphere
    var dist = camera.position.distanceTo(center);
    var nearEdge = dist - radius;
    var farEdge = dist + radius;

    // Set near/far sufficiently close to edges of sphere
    camera.near = (1 - distOffset) * nearEdge,
    camera.far = (1 + distOffset) * farEdge;

    // Bound near plane away from zero
    camera.near = Math.max(camera.near, 0.01 * radius);
}