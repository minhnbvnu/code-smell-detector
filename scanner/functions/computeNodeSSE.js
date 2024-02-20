function computeNodeSSE(camera, node) {
    node.distance = 0;
    if (node.boundingVolume.initialVolumeType === C3DTilesBoundingVolumeTypes.box) {
        boundingVolumeBox.copy(node.boundingVolume.volume);
        boundingVolumeBox.applyMatrix4(node.matrixWorld);
        node.distance = boundingVolumeBox.distanceToPoint(camera.camera3D.position);
    } else if (node.boundingVolume.initialVolumeType === C3DTilesBoundingVolumeTypes.sphere ||
               node.boundingVolume.initialVolumeType === C3DTilesBoundingVolumeTypes.region) {
        boundingVolumeSphere.copy(node.boundingVolume.volume);
        boundingVolumeSphere.applyMatrix4(node.matrixWorld);
        // TODO: see https://github.com/iTowns/itowns/issues/800
        node.distance = Math.max(0.0,
            boundingVolumeSphere.distanceToPoint(camera.camera3D.position));
    } else {
        return Infinity;
    }
    if (node.distance === 0) {
        // This test is needed in case geometricError = distance = 0
        return Infinity;
    }
    return camera._preSSE * (node.geometricError / node.distance);
}