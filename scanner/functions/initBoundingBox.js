function initBoundingBox(elt, layer) {
    elt.tightbbox.getSize(box3.max);
    box3.max.multiplyScalar(0.5);
    box3.min.copy(box3.max).negate();
    elt.obj.boxHelper = new THREE.BoxHelper(bboxMesh);
    elt.obj.boxHelper.geometry = elt.obj.boxHelper.geometry.toNonIndexed();
    elt.obj.boxHelper.computeLineDistances();
    elt.obj.boxHelper.material = elt.childrenBitField ? new THREE.LineDashedMaterial({ dashSize: 0.25, gapSize: 0.25 }) : new THREE.LineBasicMaterial();
    elt.obj.boxHelper.material.color.setHex(0);
    elt.obj.boxHelper.material.linewidth = 2;
    elt.obj.boxHelper.frustumCulled = false;
    elt.obj.boxHelper.position.copy(elt.tightbbox.min).add(box3.max);
    elt.obj.boxHelper.autoUpdateMatrix = false;
    layer.bboxes.add(elt.obj.boxHelper);
    elt.obj.boxHelper.updateMatrix();
    elt.obj.boxHelper.updateMatrixWorld();
}