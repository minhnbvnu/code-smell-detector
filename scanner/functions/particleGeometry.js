function particleGeometry() {
      var geometry = new THREE.BufferGeometry()
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.computeBoundingSphere()
      return geometry
    }