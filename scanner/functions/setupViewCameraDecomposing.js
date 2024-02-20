function setupViewCameraDecomposing(view, camera) {
    let upWorld;
    camera.matrixWorld.decompose(view.camera3D.position, view.camera3D.quaternion, view.camera3D.scale);

    // setup up vector
    upWorld = camera.localToWorld(camera.up.clone());
    upWorld = view.camera3D.position.clone().sub(upWorld);
    view.camera3D.up.copy(upWorld);
}