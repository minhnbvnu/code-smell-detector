function assertCoordEqual(coord1, coord2) {
    assert.equal(coord1.crs, coord2.crs);
    assertFloatEqual(coord1.x, coord2.x);
    assertFloatEqual(coord1.y, coord2.y);
    assertFloatEqual(coord1.z, coord2.z);
}