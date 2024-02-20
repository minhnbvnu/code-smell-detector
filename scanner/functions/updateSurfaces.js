function updateSurfaces(surfaces, position, norm) {
    surfaces.position.copy(position);
    surfaces.up.copy(position).normalize();
    surfaces.lookAt(norm);
    surfaces.updateMatrixWorld(true);
}