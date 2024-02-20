function patch_obj() {
  this.diffs = [];
  /** @type {number?} */
  this.start1 = null;
  /** @type {number?} */
  this.start2 = null;
  this.length1 = 0;
  this.length2 = 0;
}