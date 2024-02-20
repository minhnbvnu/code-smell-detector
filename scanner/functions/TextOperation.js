function TextOperation(data) {
  Operation.call(this);
  if (!data || data.type === undefined || data.pos === undefined || data.str === undefined) {
    throw new Error("Illegal argument: insufficient data.");
  }
  // '+' or '-'
  this.type = data.type;
  // the position where to apply the operation
  this.pos = data.pos;
  // the string to delete or insert
  this.str = data.str;
  // sanity checks
  if(!this.isInsert() && !this.isDelete()) {
    throw new Error("Illegal type.");
  }
  if (!_.isString(this.str)) {
    throw new Error("Illegal argument: expecting string.");
  }
  if (!_.isNumber(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
}