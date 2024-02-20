function Box3(min, max) {

  this.min = (min !== undefined) ? min : new Vector3(+Infinity, +Infinity, +Infinity);
  this.max = (max !== undefined) ? max : new Vector3(-Infinity, -Infinity, -Infinity);

}