function RopeConstraint(p1, p2, options) {
  if (!(this instanceof RopeConstraint)) return new RopeConstraint(p1, p2, options);
  Constraint.call(this);

  options = options || {};
  this._p1 = p1;
  this._p2 = p2;
  this._distance = options.length || this.getDistance();
  this._stiffness = options.stiffness || 1;
  this._expansion = 0.001;
  this._compression = 1;
  this._strength = options.strength || Infinity;

  this._deleted = false;
}