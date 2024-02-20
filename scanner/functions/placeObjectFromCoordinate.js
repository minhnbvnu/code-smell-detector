function placeObjectFromCoordinate(object, coord) {
    // set object position to the coordinate
    coord.toVector3(object.position);
    // set ENH orientation, looking at the sky (Z axis), so Y axis look to the north..
    object.lookAt(coord.geodesicNormal.clone().add(object.position));
}