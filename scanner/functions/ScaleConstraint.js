function ScaleConstraint(src, scale, offset, dest, strength) {
  this.direction = Direction.NONE;
  this.scale = scale;
  this.offset = offset;
  ScaleConstraint.superConstructor.call(this, src, dest, strength);
}