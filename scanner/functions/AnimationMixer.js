function AnimationMixer(root) {

  this._root = root;
  this._initMemoryManager();
  this._accuIndex = 0;

  this.time = 0;

  this.timeScale = 1.0;

}