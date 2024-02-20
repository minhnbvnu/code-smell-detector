function limitRotation(camera3D, rot, verticalFOV) {
    // Limit vertical rotation (look up/down) to make sure the user cannot see
    // outside of the cone defined by verticalFOV
    const limit = THREE.MathUtils.degToRad(verticalFOV - camera3D.fov) * 0.5;
    return THREE.MathUtils.clamp(rot, -limit, limit);
}