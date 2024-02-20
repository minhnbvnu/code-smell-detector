function normalUnbind() {
  this.bindingObserver.disconnect();
  this.source = null;
  this.context = null;
}