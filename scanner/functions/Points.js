function Points(geometry, material) {

  Object3D.call(this);

  this.type = 'Points';

  this.geometry = geometry !== undefined ? geometry : new BufferGeometry();
  this.material = material !== undefined ? material : new PointsMaterial({ color: Math.random() * 0xffffff });

}