function debugIdUpdate(context, layer, node) {
        if (!node.parent || !layer.visible) {
            ObjectRemovalHelper.removeChildrenAndCleanupRecursively(layer, node);
            return;
        }

        // filtering helper attached to node with the current debug layer
        let helper = node.link[layer.id];
        if (node.visible && node.material && node.material.visible) {
            if (!helper) {
                helper = new THREE.Group();
                helper.layer = layer;
                node.matrixWorld.decompose(helper.position, helper.quaternion, helper.scale);

                if (layer.id == obb_layer_id) {
                    const obbHelper = new OBBHelper(node.obb);
                    obbHelper.layer = layer;
                    helper.add(obbHelper);
                } else if (layer.id == sb_layer_id) {
                    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
                    const material = new THREE.MeshBasicMaterial({ color: color.getHex(), wireframe: true });
                    const sphereHelper = new THREE.Mesh(geometrySphere, material);
                    sphereHelper.position.copy(node.boundingSphere.center);
                    sphereHelper.scale.multiplyScalar(node.boundingSphere.radius);
                    sphereHelper.scale.set(1, 1, 1).multiplyScalar(node.boundingSphere.radius);
                    sphereHelper.layer = layer;
                    helper.add(sphereHelper);
                }

                node.link[layer.id] = helper;
            }

            layer.object3d.add(helper);
            helper.updateMatrixWorld(true);
        } else if (helper) {
            layer.object3d.remove(helper);
        }
    }