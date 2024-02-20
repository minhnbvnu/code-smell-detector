function DocumentChange(ops, before, after) {
  this.id = Substance.uuid();
  this.ops = ops.slice(0);
  this.before = before;
  this.after = after;
  this.updated = null;
  this.created = null;
  this.deleted = null;
  this._init();
  Object.freeze(this);
  Object.freeze(this.ops);
  Object.freeze(this.before);
  Object.freeze(this.after);
  // FIXME: ATM this is not possible, as NotifyPropertyChange monkey patches this info
  // Object.freeze(this.updated);
  // Object.freeze(this.deleted);
  // Object.freeze(this.created);
}