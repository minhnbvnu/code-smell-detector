function positionObject(newPosition, object) {
    xyz.setFromVector3(newPosition).as('EPSG:4326', c);
    object.position.copy(newPosition);
    object.lookAt(c.geodesicNormal.add(newPosition));
    object.rotateX(Math.PI * 0.5);
    object.updateMatrixWorld(true);
}