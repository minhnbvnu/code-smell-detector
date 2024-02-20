function LOD() {

  Object3D.call(this);

  this.type = 'LOD';

  Object.defineProperties(this, {
    levels: {
      enumerable: true,
      value: []
    }
  });

}