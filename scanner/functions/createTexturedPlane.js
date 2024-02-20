function createTexturedPlane(textureUrl, opacity) {
    const texture = new itowns.THREE.TextureLoader().load(textureUrl);
    const geometry = new itowns.THREE.PlaneGeometry(1, 1, 32);
    const material = new itowns.THREE.MeshBasicMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: opacity,
    });
    return new itowns.THREE.Mesh(geometry, material);
}