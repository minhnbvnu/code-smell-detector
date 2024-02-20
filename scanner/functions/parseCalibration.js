function parseCalibration(calibration, options = {}) {
    const useMask = options.useMask == undefined ? true : options.useMask;
    const imageYDown = options.imageYDown == undefined ? true : options.imageYDown;
    // parse intrinsics
    const proj = calibration.projection;
    const size = new THREE.Vector2().fromArray(calibration.size);
    const focal = new THREE.Vector2(proj[0], proj[4]);
    // Center of image,  convention in digital image is Y dow
    // To transform image space to webGl texture. It could inverse Y axis.
    const center = new THREE.Vector2(proj[2], imageYDown ? size.y - proj[5] : proj[5]);
    const skew = proj[1];
    const camera = new OrientedImageCamera(size, focal, center, options.near, options.far, skew);

    // parse extrinsics: Object3d.matrix is from local to world
    // p_world = position + transpose(rotation) * p_local
    camera.position.fromArray(calibration.position);
    // calibration.rotation is row-major but fromArray expects a column-major array, yielding the transposed matrix
    const rotationInverse = matrix3.fromArray(calibration.rotation);
    camera.matrix.setFromMatrix3(rotationInverse);
    camera.quaternion.setFromRotationMatrix(camera.matrix);

    // local axes for cameras is (X right, Y up, Z back) rather than (X right, Y down, Z front)
    camera.rotateX(Math.PI);

    if (calibration.distortion) {
        camera.distortion.setFromMicmacCalibration(calibration.distortion, imageYDown);
    }

    camera.maskPath = calibration.mask;
    camera.name = calibration.id;

    let resolve;
    const deferred = new Promise((r) => { resolve = r; });
    if (useMask && camera.maskPath) {
        textureLoader.load(camera.maskPath,
            (mask) => {
                camera.maskTexture = mask;
                resolve(camera);
            });
    } else {
        resolve(camera);
    }
    return deferred;
}