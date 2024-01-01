constructor () {
    super();
    this.components = {};
    // To avoid double initializations and infinite loops.
    this.initializingComponents = {};
    this.componentsToUpdate = {};
    this.isEntity = true;
    this.isPlaying = false;
    this.object3D = new THREE.Group();
    this.object3D.el = this;
    this.object3DMap = {};
    this.parentEl = null;
    this.rotationObj = {};
    this.states = [];
  }