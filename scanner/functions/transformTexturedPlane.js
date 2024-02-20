function transformTexturedPlane(camera, distance, plane) {
    const Yreel = 2 * Math.tan(itowns.THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
    const Xreel = camera.aspect * Yreel;

    // set position and scale
    plane.scale.set(Xreel, Yreel, 1);
    plane.position.set(0, 0, -distance);

    plane.updateMatrixWorld();
}