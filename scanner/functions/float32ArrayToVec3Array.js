function float32ArrayToVec3Array(arr) {
    var res = []
    for(var i = 0; i < arr.length; i+=3) {
      res[i / 3] = new THREE.Vector3(arr[i], arr[i + 1], arr[i + 2])
    }
    return res
  }