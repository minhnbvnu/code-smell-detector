function lookAtSphere(camera, center, radius, setNearFar) {
    setNearFar = setNearFar === undefined ? 'safe' : setNearFar;
    if (!camera.isPerspectiveCamera) {
        console.error('Expecting a perspective camera.');
    }

    // Compute distance based on FOV
    var radScale = 1.5;  // Include this much more than the sphere
    var distance = (radScale * radius) / Math.tan(0.5 * camera.fov * Math.PI / 180);

    // Place camera such that the model is in the -z direction from the camera
    camera.position.setX(center.x);
    camera.position.setY(center.y);
    camera.position.setZ(center.z + distance);

    // Look at scene center
    camera.lookAt(center.clone());

    if (setNearFar === 'tight') {
        // Set near and far planes to include sphere with a narrow margin
        shrinkFrustumPlanes(camera, center, radius);
    } else if (setNearFar === 'safe') {
        // Set near and far planes to include sphere with a wide margin for zooming
        safeFrustumPlanes(camera, center, radius);
    } else if (setNearFar) {
        // If setNearFar is a non-valid, truthy value, it is invalid
        throw new Error('setNearFar argument to lookAtSphere invalid: ' + setNearFar);
    }

    // Update matrix
    camera.updateProjectionMatrix();
}