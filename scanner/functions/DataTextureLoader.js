function DataTextureLoader(manager) {

  this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;

  // override in sub classes
  this._parser = null;

}