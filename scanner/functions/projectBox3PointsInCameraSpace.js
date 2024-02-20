function projectBox3PointsInCameraSpace(camera, box3, matrixWorld) {
    // Projects points in camera space
    // We don't project directly on screen to avoid artifacts when projecting
    // points behind the near plane.
    let m = camera.camera3D.matrixWorldInverse;
    if (matrixWorld) {
        m = tmp.matrix.multiplyMatrices(camera.camera3D.matrixWorldInverse, matrixWorld);
    }
    points[0].set(box3.min.x, box3.min.y, box3.min.z).applyMatrix4(m);
    points[1].set(box3.min.x, box3.min.y, box3.max.z).applyMatrix4(m);
    points[2].set(box3.min.x, box3.max.y, box3.min.z).applyMatrix4(m);
    points[3].set(box3.min.x, box3.max.y, box3.max.z).applyMatrix4(m);
    points[4].set(box3.max.x, box3.min.y, box3.min.z).applyMatrix4(m);
    points[5].set(box3.max.x, box3.min.y, box3.max.z).applyMatrix4(m);
    points[6].set(box3.max.x, box3.max.y, box3.min.z).applyMatrix4(m);
    points[7].set(box3.max.x, box3.max.y, box3.max.z).applyMatrix4(m);

    // In camera space objects are along the -Z axis
    // So if min.z is > -near, the object is invisible
    let atLeastOneInFrontOfNearPlane = false;
    for (let i = 0; i < 8; i++) {
        if (points[i].z <= -camera.camera3D.near) {
            atLeastOneInFrontOfNearPlane = true;
        } else {
            // Clamp to near plane
            points[i].z = -camera.camera3D.near;
        }
    }

    return atLeastOneInFrontOfNearPlane ? points : undefined;
}