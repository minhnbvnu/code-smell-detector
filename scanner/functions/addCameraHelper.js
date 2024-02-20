function addCameraHelper(view, camera) {
    const cameraHelper = new itowns.THREE.CameraHelper(camera);
    view.scene.add(cameraHelper);
    cameraHelper.updateMatrixWorld(true);
}