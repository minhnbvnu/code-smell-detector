function GLTFLoader(manager) {

  this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
  this.dracoLoader = null;

}