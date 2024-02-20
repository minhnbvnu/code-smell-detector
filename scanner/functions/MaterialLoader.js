function MaterialLoader(manager) {

  this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
  this.textures = {};

}