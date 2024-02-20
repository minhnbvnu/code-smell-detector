function assertVerticesAreInOBB(builder, extent) {
    const params = {
        extent,
        disableSkirt: true,
        level: 0,
        segment: 1,
    };

    return newTileGeometry(builder, params)
        .then((result) => {
            const geom = result.geometry;
            const inverse = new THREE.Matrix4().copy(geom.OBB.matrix).invert();

            let failing = 0;
            const vec = new THREE.Vector3();
            for (let i = 0; i < geom.attributes.position.count; i++) {
                vec.fromArray(geom.attributes.position.array, 3 * i);

                vec.applyMatrix4(inverse);
                if (!geom.OBB.box3D.containsPoint(vec)) {
                    failing++;
                }
            }
            assert.equal(geom.attributes.position.count - failing, geom.attributes.position.count, 'All points should be inside OBB');
        });
}