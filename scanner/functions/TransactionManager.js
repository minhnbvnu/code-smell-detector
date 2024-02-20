function TransactionManager(options) {
  var transaction = options.transaction || {};
  this.namespace = transaction.namespace || DEFAULT_NAMESPACE;
  this.keyLength = transaction.keyLength || 32;
  // Passed option is in minutes, convert to days
  this.stateExpiration = options.stateExpiration ? (options.stateExpiration / 60 / 24) : times.MINUTES_30;
  this.storage = new Storage(options);
  this.options = options;
}