function HashEnvironment() {
  this.onHashChange = this.onHashChange.bind(this);
  Environment.call(this);
}