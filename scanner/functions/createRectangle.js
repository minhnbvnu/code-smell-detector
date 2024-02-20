function createRectangle() {
    const geomPlane = new THREE.PlaneGeometry(4, 2, 1);
    const rectangle = new THREE.Mesh(geomPlane, material);
    rectangle.rotateX(-Math.PI * 0.5);
    return rectangle;
}