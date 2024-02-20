function BoxConstraint(x, y, width, height) {
  if (!(this instanceof BoxConstraint)) return new BoxConstraint(x, y, width, height);
  Constraint.call(this);

  this._min = Vector(x, y);
  this._max = Vector(x + width, y + height);
}