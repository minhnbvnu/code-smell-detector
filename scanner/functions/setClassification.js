function setClassification(point, batchTable) {
    if (!point.geometry) { return; }
    if (batchTable.content && batchTable.content.Classification) { point.geometry.setAttribute('classification', new THREE.BufferAttribute(new Uint8Array(batchTable.content.Classification), 1, true)); }
    return point;
}