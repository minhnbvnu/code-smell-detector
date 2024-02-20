function ReactWWReconcileTransaction() {
  this.useCreateElement = true;
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}