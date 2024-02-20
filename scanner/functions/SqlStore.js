function SqlStore(opts) {
  opts = opts || {};
  this.tableName = opts.tableName;
  this.storage = opts.storage;
  extend(this, opts);

  this.takeFirstN = takeNextN(true, this);
  this.takeLastN = takeNextN(false, this);
}