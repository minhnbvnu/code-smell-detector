function SphereHelper(radius) {
    THREE.Mesh.call(this);

    this.geometry = new THREE.SphereGeometry(radius, 8, 8);
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    this.material = new THREE.MeshBasicMaterial({
        color: color.getHex(),
        wireframe: true,
    });
}