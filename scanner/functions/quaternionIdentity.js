function quaternionIdentity(coordinates, target = new THREE.Quaternion()) {
    return coordinates ? target.set(0, 0, 0, 1) : quaternionIdentity;
}