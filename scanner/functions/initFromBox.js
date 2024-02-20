function initFromBox(box) {
    // box[0], box[1], box[2] = center of the box
    // box[3], box[4], box[5] = x axis direction and half-length
    // box[6], box[7], box[8] = y axis direction and half-length
    // box[9], box[10], box[11] = z axis direction and half-length
    boxCenter.set(box[0], box[1], box[2]);
    boxSize.set(box[3], box[7], box[11]).multiplyScalar(2);
    const box3 = new THREE.Box3();
    box3.setFromCenterAndSize(boxCenter, boxSize);
    return box3;
}