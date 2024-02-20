function LinearForce(strength, angle) {
  if (!(this instanceof LinearForce)) return new LinearForce(strength, angle);
  Force.call(this);

  this._vector = Vector(strength, 0).rotate(angle);
}