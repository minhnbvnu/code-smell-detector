function setWrap(fn) {
  var offset1 = this.getTimezoneOffset();
  var ret = fn();
  this.original.setTime(new Date(this.getTime()));
  var offset2 = this.getTimezoneOffset();
  if (offset2 - offset1) {
    this.original.setMinutes(this.original.getMinutes() + offset2 - offset1);
  }
  return ret;
}