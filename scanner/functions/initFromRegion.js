function initFromRegion(region, tileMatrixInverse) {
    const east = region[2];
    const west = region[0];
    const south = region[1];
    const north = region[3];
    const minHeight = region[4];
    const maxHeight = region[5];

    const eastDeg = THREE.MathUtils.radToDeg(east);
    const westDeg = THREE.MathUtils.radToDeg(west);
    const southDeg = THREE.MathUtils.radToDeg(south);
    const northDeg = THREE.MathUtils.radToDeg(north);

    northWestBottomCarto.setFromValues(westDeg, northDeg, minHeight);
    ellipsoid.cartographicToCartesian(northWestBottomCarto, northWestBottomVec3);

    southEastUpCarto.setFromValues(eastDeg, southDeg, maxHeight);
    ellipsoid.cartographicToCartesian(southEastUpCarto, southEastUpVec3);

    const regionCenter = new THREE.Vector3();
    regionCenter.lerpVectors(northWestBottomVec3, southEastUpVec3, 0.5);
    const radius = radiusScratch.subVectors(northWestBottomVec3, southEastUpVec3).length() / 2;

    const sphere = new THREE.Sphere(regionCenter, radius);
    sphere.applyMatrix4(tileMatrixInverse);

    return sphere;
}