function getRig(camera) {
    rigs[camera.uuid] = rigs[camera.uuid] || new CameraRig();
    return rigs[camera.uuid];
}