function initFromSphere(sphere) {
    const sphereCenter = new THREE.Vector3();
    sphereCenter.set(sphere[0], sphere[1], sphere[2]);
    return new THREE.Sphere(sphereCenter, sphere[3]);
}