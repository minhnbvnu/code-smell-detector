function createBoundingSphere(object3d, out) {
        var boundingSphere = out;
        var center = boundingSphere.center;
        object3d.traverse(function (object) {
            if (!object.isMesh)
                return;
            _box3A.expandByObject(object);
        });
        _box3A.getCenter(center);
        var maxRadiusSq = 0;
        object3d.traverse(function (object) {
            if (!object.isMesh)
                return;
            var mesh = object;
            var geometry = mesh.geometry.clone();
            geometry.applyMatrix4(mesh.matrixWorld);
            if (geometry.isBufferGeometry) {
                var bufferGeometry = geometry;
                var position = bufferGeometry.attributes.position;
                for (var i = 0, l = position.count; i < l; i++) {
                    _v3A.fromBufferAttribute(position, i);
                    maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_v3A));
                }
            }
            else {
                var position = geometry.attributes.position;
                var vector = new THREE.Vector3();
                for (var i = 0, l = position.count; i < l; i++) {
                    vector.fromBufferAttribute(position, i);
                    maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
                }
            }
        });
        boundingSphere.radius = Math.sqrt(maxRadiusSq);
        return boundingSphere;
    }