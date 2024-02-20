function forceUpdateIfMounted() {
  /*jshint validthis:true */
  if (this.isMounted()) {
    this.forceUpdate();
  }
}