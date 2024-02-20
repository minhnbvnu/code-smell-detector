function PinConstraint(particle, position) {
  if (!(this instanceof PinConstraint)) return new PinConstraint(particle, position);
  Constraint.call(this);

  this._particle = particle;
  this._position = position || particle.position.clone();
}