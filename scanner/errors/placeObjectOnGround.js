function placeObjectOnGround(layer, crs, obj, options = {}, tileHint) {
    console.warn('placeObjectOnGround has been deprecated because it needs review and test');
    let tiles;
    if (tileHint) {
        tiles = tileHint.concat(layer.level0Nodes);
    } else {
        tiles = layer.level0Nodes;
    }

    if (!options.modifyGeometry) {
        if (options.cache) {
            options.cache.length = 1;
        }
        const matrices = {
            worldFromLocal: obj.parent ? obj.parent.matrixWorld : undefined,
            localFromWorld: obj.parent ? new THREE.Matrix4().copy(obj.parent.matrixWorld).invert() : undefined,
        };
        const result = _updateVector3(
            layer,
            options.method || DEMUtils.FAST_READ_Z,
            tiles,
            crs,
            obj.position,
            options.offset || 0,
            matrices,
            undefined,
            options.cache ? options.cache[0] : undefined);

        if (result) {
            if (options.cache) {
                options.cache[0] = result;
            }
            obj.updateMatrix();
            obj.updateMatrixWorld();
            return true;
        }
    } else {
        const matrices = {
            worldFromLocal: obj.matrixWorld,
            localFromWorld: new THREE.Matrix4().copy(obj.matrixWorld).invert(),
        };

        const geometry = obj.geometry;
        if (geometry.vertices) {
            if (options.cache) {
                options.cache.length = geometry.vertices.length;
            }

            let success = true;
            const coord = new Coordinates(crs);
            for (let i = 0; i < geometry.vertices.length; i++) {
                const cached = options.cache ? options.cache[i] : undefined;

                const result = _updateVector3(
                    layer,
                    options.method || DEMUtils.FAST_READ_Z,
                    tiles,
                    crs,
                    geometry.vertices[i],
                    options.offset || 0,
                    matrices,
                    coord,
                    cached);

                if (options.cache) {
                    options.cache[i] = result;
                }
                if (!result) {
                    success = false;
                }
            }
            geometry.verticesNeedUpdate = true;
            return success;
        } else if (geometry.isBufferGeometry) {
            if (options.cache) {
                options.cache.length = geometry.attributes.position.count;
            }
            let success = true;

            const tmp = new THREE.Vector3();
            const coord = new Coordinates(crs);
            for (let i = 0; i < geometry.attributes.position.count; i++) {
                const cached = options.cache ? options.cache[i] : undefined;

                tmp.fromBufferAttribute(geometry.attributes.position, i);
                const prev = tmp.z;
                const result = _updateVector3(
                    layer,
                    options.method || DEMUtils.FAST_READ_Z,
                    tiles,
                    crs,
                    tmp,
                    options.offset || 0,
                    matrices,
                    coord,
                    cached);
                if (options.cache) {
                    options.cache[i] = result;
                }
                if (!result) {
                    success = false;
                }
                if (prev != tmp.z) {
                    geometry.attributes.position.needsUpdate = true;
                }
                geometry.attributes.position.setXYZ(i, tmp.x, tmp.y, tmp.z);
            }
            return success;
        }
    }
}