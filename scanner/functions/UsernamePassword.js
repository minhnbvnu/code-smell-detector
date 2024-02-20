function UsernamePassword(options) {
  this.baseOptions = options;
  this.request = new RequestBuilder(options);
  this.transactionManager = new TransactionManager(this.baseOptions);
}