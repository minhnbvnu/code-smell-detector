function moveCameraVerticalGlobe(value) {
    // compute geodesic normale
    normal.copy(this.camera.position);
    normal.normalize();
    this.camera.position.add(normal.multiplyScalar(value));
}