function setupViewCameraLookingAtObject(camera, coord, objectToLookAt) {
    camera.position.copy(coord);
    camera.up.copy(coord.geodesicNormal);
    camera.lookAt(objectToLookAt.getWorldPosition());
}