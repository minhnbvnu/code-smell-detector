function makeTree() {
    const trunkRadius = 5;
    const trunkHeight = 20;
    const topHeight = 10;
    const root = new THREE.Object3D();

    // Trunk
    const geometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius, trunkHeight, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(geometry, material);
    trunk.rotateX(Math.PI / 2);
    trunk.position.z = 10;
    trunk.updateMatrix();
    root.add(trunk);

    // Canopy
    const geometryCanop = new THREE.SphereGeometry(topHeight, topHeight, 10);
    const materialCanop = new THREE.MeshPhongMaterial({ color: 0x00aa00 });
    const top = new THREE.Mesh(geometryCanop, materialCanop);
    top.position.z = trunkHeight - (topHeight / 3) + 10;
    top.updateMatrix();
    root.add(top);

    return root;
}