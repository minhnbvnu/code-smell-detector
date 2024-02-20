function getLookAtFromMath(view, camera) {
    const direction = new THREE.Vector3(0, 0, 0.5);
    direction.unproject(camera);
    direction.sub(camera.position).normalize();
    if (view.referenceCrs == 'EPSG:4978') {
        // Intersect Ellispoid
        return ellipsoid.intersection({ direction, origin: camera.position });
    } else {
        // Intersect plane
        const distance = camera.position.z / direction.z;
        return direction.multiplyScalar(distance).add(camera.position);
    }
}