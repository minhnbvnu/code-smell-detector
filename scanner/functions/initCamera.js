function initCamera(view, image, coord, EnhToOrientationUp, EnhToOrientationLookAt, rotMatrix,
    orientationToCameraUp, orientationToCameraLookAt, distance, size, focale) {
    const fov = itowns.THREE.MathUtils.radToDeg((2 * Math.atan((size[1] / 2) / focale)));
    const coordView = coord.as(view.referenceCrs);

    // create 'local space', with the origin placed on 'coord',
    // with Y axis to the north, X axis to the east and Z axis as the geodesic normal.
    const localSpace = new itowns.THREE.Object3D();
    view.scene.add(localSpace);
    placeObjectFromCoordinate(localSpace, coordView);

    // add second object : 'oriented image'
    const orientedImage = new itowns.THREE.Object3D();
    // setup initial convention orientation.
    orientedImage.up.copy(EnhToOrientationUp);
    orientedImage.lookAt(EnhToOrientationLookAt);

    // place the 'oriented image' in the 'local space'
    localSpace.add(orientedImage);

    // apply rotation
    const quaternion = new itowns.THREE.Quaternion().setFromRotationMatrix(rotMatrix);
    orientedImage.quaternion.multiply(quaternion);
    // orientedImage.updateMatrixWorld();

    // create a THREE JS Camera
    const camera = new itowns.THREE.PerspectiveCamera(fov, size[0] / size[1], distance / 2, distance * 2);
    camera.up.copy(orientationToCameraUp);
    camera.lookAt(orientationToCameraLookAt);

    orientedImage.add(camera);

    localSpace.updateMatrixWorld(true);
    return camera;
}