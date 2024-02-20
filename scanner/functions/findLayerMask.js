function findLayerMask(lyr) {
    return find(layerMasks, function(o) {return o.layer == lyr;});
  }