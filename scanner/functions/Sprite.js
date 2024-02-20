function Sprite(material) {

  Object3D.call(this);

  this.type = 'Sprite';

  if (geometry === undefined) {

    geometry = new BufferGeometry();

    var float32Array = new Float32Array([
      -0.5, -0.5, 0, 0, 0,
      0.5, -0.5, 0, 1, 0,
      0.5, 0.5, 0, 1, 1,
      -0.5, 0.5, 0, 0, 1
    ]);

    var interleavedBuffer = new InterleavedBuffer(float32Array, 5);

    geometry.setIndex([0, 1, 2, 0, 2, 3]);
    geometry.addAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
    geometry.addAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));

  }

  this.geometry = geometry;
  this.material = (material !== undefined) ? material : new SpriteMaterial();

  this.center = new Vector2(0.5, 0.5);

}