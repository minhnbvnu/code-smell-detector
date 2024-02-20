function Box2(min, max) {

  this.min = (min !== undefined) ? min : new Vector2(+Infinity, +Infinity);
  this.max = (max !== undefined) ? max : new Vector2(-Infinity, -Infinity);

}