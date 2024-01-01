function lookAtVector (sourcePoint, destPoint) {
        return auxQuaternion.setFromRotationMatrix(
            auxMaxtrix.identity()
            .lookAt(sourcePoint, destPoint, new THREE.Vector3(0, 1, 0)));
      }