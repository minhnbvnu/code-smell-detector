function OBJLoader(manager) {

  this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;

  this.materials = null;

}