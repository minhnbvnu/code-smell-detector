function createCircle() {
    const geomCircle = new THREE.CircleGeometry(1, 32);
    return new THREE.Mesh(geomCircle, material);
}